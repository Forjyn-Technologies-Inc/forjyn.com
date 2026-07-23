export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import type { EnvBag } from '../../lib/config';
import { parseContactForm } from '../../lib/mail/parseContactForm';
import { sendContactEmail } from '../../lib/mail/sendContactEmail';

export const POST: APIRoute = async ({ request }) => {
	try {
		const contentType = request.headers.get('content-type') ?? '';
		if (
			!contentType.includes('multipart/form-data') &&
			!contentType.includes('application/x-www-form-urlencoded')
		) {
			return new Response(JSON.stringify({ ok: false, error: 'Unsupported content type.' }), {
				status: 415,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const form = await request.formData();
		const payload = parseContactForm(form);
		const result = await sendContactEmail(payload, env as EnvBag);

		return new Response(
			JSON.stringify({
				ok: true,
				id: result.id,
				message:
					payload.type === 'demo'
						? 'Thank you for contacting Forjyn. Your demo request has been received. A member of our team will contact you soon.'
						: 'Thank you for contacting Forjyn. Your message has been received.',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to send your message.';
		console.error('[api/contact]', message);
		return new Response(JSON.stringify({ ok: false, error: message }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
