export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import {
	sendContactEmail,
	type ContactPayload,
	type DemoPayload,
	type GeneralPayload,
} from '../../lib/mail/sendContactEmail';

function asString(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value.trim() : '';
}

function parseDemo(form: FormData): DemoPayload {
	const firstName = asString(form.get('firstName'));
	const lastName = asString(form.get('lastName'));
	const email = asString(form.get('email'));
	const organization = asString(form.get('organization'));
	const organizationType = asString(form.get('organizationType'));

	if (!firstName || !lastName || !email || !organization || !organizationType) {
		throw new Error('Please complete all required demo fields.');
	}

	return {
		type: 'demo',
		firstName,
		lastName,
		email,
		phone: asString(form.get('phone')) || undefined,
		organization,
		jobTitle: asString(form.get('jobTitle')) || undefined,
		organizationType,
		organizationSize: asString(form.get('organizationSize')) || undefined,
		interests: form.getAll('interests').map(asString).filter(Boolean),
		expectedUsers: asString(form.get('expectedUsers')) || undefined,
		goals: asString(form.get('goals')) || undefined,
	};
}

function parseGeneral(form: FormData): GeneralPayload {
	const name = asString(form.get('name'));
	const email = asString(form.get('email'));
	const role = asString(form.get('role'));
	const subject = asString(form.get('subject'));
	const message = asString(form.get('message'));

	if (!name || !email || !role || !subject || !message) {
		throw new Error('Please complete all required contact fields.');
	}

	return {
		type: 'general',
		name,
		email,
		organization: asString(form.get('organization')) || undefined,
		role,
		subject,
		message,
	};
}

function parsePayload(form: FormData): ContactPayload {
	const type = asString(form.get('type'));
	if (type === 'demo') return parseDemo(form);
	if (type === 'general') return parseGeneral(form);
	throw new Error('Unknown form type.');
}

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
		const payload = parsePayload(form);
		const result = await sendContactEmail(payload, env as Record<string, string | undefined>);

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
