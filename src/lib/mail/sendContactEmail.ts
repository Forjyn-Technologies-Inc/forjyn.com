import { Resend } from 'resend';
import { getResendConfig, type EnvBag } from '../config';
import { sanitizeHeaderValue } from './fieldValidation';
import { buildDemoHtml, buildGeneralHtml } from './templates';
import type { ContactPayload } from './types';

export type { ContactFormType, ContactPayload, DemoPayload, GeneralPayload } from './types';

export async function sendContactEmail(
	payload: ContactPayload,
	runtimeEnv?: EnvBag,
): Promise<{ id: string }> {
	const { apiKey, from, to } = getResendConfig(runtimeEnv);
	const resend = new Resend(apiKey);
	const isDemo = payload.type === 'demo';
	const subject = sanitizeHeaderValue(
		isDemo ? `Demo request — ${payload.organization}` : `Contact — ${payload.subject}`,
	);
	const html = isDemo ? buildDemoHtml(payload) : buildGeneralHtml(payload);

	const { data, error } = await resend.emails.send({
		from,
		to: [to],
		replyTo: payload.email,
		subject,
		html,
	});

	if (error || !data) {
		// Avoid leaking provider error text into upstream logs/clients.
		throw new Error('RESEND_SEND_FAILED');
	}

	return { id: data.id };
}
