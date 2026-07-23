import type { DemoPayload, GeneralPayload } from './types';

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

export function buildDemoHtml(payload: DemoPayload): string {
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

export function buildGeneralHtml(payload: GeneralPayload): string {
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
