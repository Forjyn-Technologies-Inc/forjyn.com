export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import type { EnvBag } from '../../lib/config';
import { FormValidationError } from '../../lib/mail/fieldValidation';
import { parseContactForm } from '../../lib/mail/parseContactForm';
import { sendContactEmail } from '../../lib/mail/sendContactEmail';
import { verifyTurnstileToken } from '../../lib/turnstile';

const PUBLIC_ERROR =
	'Unable to send your message. Please try again or email sales@forjyn.com.';

const ALLOWED_ORIGINS = new Set([
	'https://forjyn.com',
	'https://www.forjyn.com',
	'http://localhost:4321',
	'http://127.0.0.1:4321',
	'http://localhost:8787',
	'http://127.0.0.1:8787',
]);

function isAllowedOrigin(request: Request): boolean {
	const origin = request.headers.get('Origin');
	if (!origin) return false;
	if (ALLOWED_ORIGINS.has(origin)) return true;
	// Cloudflare Workers preview / staging hostnames for this project.
	try {
		const host = new URL(origin).hostname;
		return host === 'forjyn.shrill-thunder-fbe6.workers.dev' || host.endsWith('.forjyn.com');
	} catch {
		return false;
	}
}

function clientIp(request: Request, clientAddress?: string): string | undefined {
	return (
		request.headers.get('CF-Connecting-IP') ??
		request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
		clientAddress
	);
}

function json(body: Record<string, unknown>, status: number): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
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

		const form = await request.formData();

		const turnstileOk = await verifyTurnstileToken({
			token: form.get('cf-turnstile-response'),
			remoteip: clientIp(request, clientAddress),
			runtimeEnv: env as EnvBag,
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

		await sendContactEmail(payload, env as EnvBag);

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

		const detail = error instanceof Error ? error.message : 'unknown error';
		// Log only a short code-ish detail — never the form body / PII.
		console.error('[api/contact] send_failed', detail.slice(0, 200));
		return json({ ok: false, error: PUBLIC_ERROR }, 502);
	}
};
