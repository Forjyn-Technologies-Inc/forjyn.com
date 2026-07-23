export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { FormValidationError } from '../../lib/mail/fieldValidation';
import { parseContactForm } from '../../lib/mail/parseContactForm';
import { sendContactEmail } from '../../lib/mail/sendContactEmail';
import { enforceRateLimit } from '../../lib/rateLimit';
import { verifyTurnstileToken } from '../../lib/turnstile';

const PUBLIC_ERROR =
	'Unable to send your message. Please try again or email sales@forjyn.com.';

/** Explicit origins only — no wildcard subdomains. */
const ALLOWED_ORIGINS = new Set([
	'https://forjyn.com',
	'https://www.forjyn.com',
	'https://forjyn.shrill-thunder-fbe6.workers.dev',
	'http://localhost:4321',
	'http://127.0.0.1:4321',
	'http://localhost:8787',
	'http://127.0.0.1:8787',
]);

const RATE_LIMIT = 5;
const RATE_WINDOW_SEC = 15 * 60;

function isAllowedOrigin(request: Request): boolean {
	const origin = request.headers.get('Origin');
	if (!origin) return false;
	return ALLOWED_ORIGINS.has(origin);
}

function clientIp(request: Request, clientAddress?: string): string {
	return (
		request.headers.get('CF-Connecting-IP') ??
		clientAddress ??
		'unknown'
	);
}

function json(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
			...extraHeaders,
		},
	});
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	try {
		if (!isAllowedOrigin(request)) {
			return json({ ok: false, error: 'Forbidden origin.' }, 403);
		}

		const contentType = request.headers.get('content-type') ?? '';
		if (
			!contentType.includes('multipart/form-data') &&
			!contentType.includes('application/x-www-form-urlencoded')
		) {
			return json({ ok: false, error: 'Unsupported content type.' }, 415);
		}

		const ip = clientIp(request, clientAddress);
		const rate = await enforceRateLimit({
			key: `contact:${ip}`,
			limit: RATE_LIMIT,
			windowSec: RATE_WINDOW_SEC,
			kv: env.SESSION,
		});
		if (!rate.ok) {
			return json(
				{ ok: false, error: 'Too many requests. Please try again later.' },
				429,
				rate.retryAfterSec ? { 'Retry-After': String(rate.retryAfterSec) } : undefined,
			);
		}

		const form = await request.formData();

		const turnstileOk = await verifyTurnstileToken({
			token: form.get('cf-turnstile-response'),
			remoteip: ip === 'unknown' ? undefined : ip,
			runtimeEnv: env,
		});
		if (!turnstileOk) {
			return json({ ok: false, error: 'Please complete the security check and try again.' }, 403);
		}

		let payload;
		try {
			payload = parseContactForm(form);
		} catch (error) {
			// Silent success for honeypot trips — do not tip off bots.
			if (error instanceof FormValidationError && error.message === 'BOT_TRAP') {
				return json({
					ok: true,
					message: 'Thank you for contacting Forjyn. Your message has been received.',
				}, 200);
			}
			throw error;
		}

		await sendContactEmail(payload, env);

		return json(
			{
				ok: true,
				message:
					payload.type === 'demo'
						? 'Thank you for contacting Forjyn. Your demo request has been received. A member of our team will contact you soon.'
						: 'Thank you for contacting Forjyn. Your message has been received.',
			},
			200,
		);
	} catch (error) {
		if (error instanceof FormValidationError) {
			return json({ ok: false, error: error.message }, 400);
		}

		// Do not log provider/PII details — fixed code only.
		const code =
			error instanceof Error && error.message.includes('TURNSTILE_SECRET')
				? 'config_error'
				: error instanceof Error && error.message.includes('RESEND')
					? 'mail_config_error'
					: 'send_failed';
		console.error('[api/contact]', code);
		return json({ ok: false, error: PUBLIC_ERROR }, 502);
	}
};
