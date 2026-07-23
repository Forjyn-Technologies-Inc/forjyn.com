import { Resend } from 'resend';

export type ContactFormType = 'demo' | 'general';

export interface DemoPayload {
	type: 'demo';
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	organization: string;
	jobTitle?: string;
	organizationType: string;
	organizationSize?: string;
	interests?: string[];
	expectedUsers?: string;
	goals?: string;
}

export interface GeneralPayload {
	type: 'general';
	name: string;
	email: string;
	organization?: string;
	role: string;
	subject: string;
	message: string;
}

export type ContactPayload = DemoPayload | GeneralPayload;

type EnvBag = Record<string, string | undefined>;

function readEnv(name: string, runtimeEnv?: EnvBag): string {
	const value =
		runtimeEnv?.[name] ??
		(typeof import.meta !== 'undefined'
			? (import.meta.env as EnvBag)[name]
			: undefined) ??
		(typeof process !== 'undefined' ? process.env[name] : undefined);

	if (!value || value.includes('xxxxxxxx')) {
		throw new Error(`${name} is not configured`);
	}

	return value;
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function row(label: string, value: string | undefined): string {
	if (!value?.trim()) return '';
	return `<tr><td style="padding:6px 12px 6px 0;color:#8D98B8;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#F7FBF0;">${escapeHtml(value)}</td></tr>`;
}

function buildDemoHtml(payload: DemoPayload): string {
	const interests = payload.interests?.length ? payload.interests.join(', ') : undefined;
	return `
		<div style="font-family:Inter,Arial,sans-serif;background:#0B1020;color:#F7FBF0;padding:24px;">
			<h1 style="font-size:20px;margin:0 0 8px;">New demo request</h1>
			<p style="color:#8D98B8;margin:0 0 20px;">Submitted via forjyn.com/contact</p>
			<table style="border-collapse:collapse;width:100%;max-width:640px;">
				${row('Name', `${payload.firstName} ${payload.lastName}`)}
				${row('Email', payload.email)}
				${row('Phone', payload.phone)}
				${row('Organization', payload.organization)}
				${row('Job title', payload.jobTitle)}
				${row('Organization type', payload.organizationType)}
				${row('Organization size', payload.organizationSize)}
				${row('Interests', interests)}
				${row('Expected users', payload.expectedUsers)}
				${row('Goals', payload.goals)}
			</table>
		</div>
	`;
}

function buildGeneralHtml(payload: GeneralPayload): string {
	return `
		<div style="font-family:Inter,Arial,sans-serif;background:#0B1020;color:#F7FBF0;padding:24px;">
			<h1 style="font-size:20px;margin:0 0 8px;">New contact message</h1>
			<p style="color:#8D98B8;margin:0 0 20px;">Submitted via forjyn.com/contact</p>
			<table style="border-collapse:collapse;width:100%;max-width:640px;">
				${row('Name', payload.name)}
				${row('Email', payload.email)}
				${row('Organization', payload.organization)}
				${row('Role', payload.role)}
				${row('Subject', payload.subject)}
				${row('Message', payload.message)}
			</table>
		</div>
	`;
}

export async function sendContactEmail(
	payload: ContactPayload,
	runtimeEnv?: EnvBag,
): Promise<{ id: string }> {
	const apiKey = readEnv('RESEND_API_KEY', runtimeEnv);
	const from = readEnv('RESEND_FROM', runtimeEnv);
	const to = readEnv('RESEND_TO', runtimeEnv);

	const resend = new Resend(apiKey);
	const isDemo = payload.type === 'demo';
	const subject = isDemo
		? `Demo request — ${payload.organization}`
		: `Contact — ${payload.subject}`;
	const html = isDemo ? buildDemoHtml(payload) : buildGeneralHtml(payload);

	const { data, error } = await resend.emails.send({
		from,
		to: [to],
		replyTo: payload.email,
		subject,
		html,
	});

	if (error || !data) {
		throw new Error(error?.message ?? 'Failed to send email');
	}

	return { id: data.id };
}
