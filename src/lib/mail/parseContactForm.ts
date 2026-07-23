import type { ContactPayload, DemoPayload, GeneralPayload } from './types';

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

/** Parse and validate contact FormData into a typed payload. */
export function parseContactForm(form: FormData): ContactPayload {
	const type = asString(form.get('type'));
	if (type === 'demo') return parseDemo(form);
	if (type === 'general') return parseGeneral(form);
	throw new Error('Unknown form type.');
}
