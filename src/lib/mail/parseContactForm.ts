import type { ContactPayload, DemoPayload, GeneralPayload } from './types';
import {
	FIELD_LIMITS,
	FormValidationError,
	assertHoneypotEmpty,
	assertOrgSize,
	assertOrgType,
	assertRole,
	assertSubject,
	filterInterests,
	requireEmail,
	requireLength,
} from './fieldValidation';

function asString(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value.trim() : '';
}

function parseDemo(form: FormData): DemoPayload {
	const firstName = requireLength(asString(form.get('firstName')), FIELD_LIMITS.name, 'First name');
	const lastName = requireLength(asString(form.get('lastName')), FIELD_LIMITS.name, 'Last name');
	const email = requireEmail(asString(form.get('email')));
	const organization = requireLength(
		asString(form.get('organization')),
		FIELD_LIMITS.organization,
		'Organization',
	);
	const organizationType = assertOrgType(asString(form.get('organizationType')));

	if (!firstName || !lastName || !organization) {
		throw new FormValidationError('Please complete all required demo fields.');
	}

	const phoneRaw = asString(form.get('phone'));
	const jobTitleRaw = asString(form.get('jobTitle'));
	const expectedUsersRaw = asString(form.get('expectedUsers'));
	const goalsRaw = asString(form.get('goals'));

	return {
		type: 'demo',
		firstName,
		lastName,
		email,
		phone: phoneRaw
			? requireLength(phoneRaw, FIELD_LIMITS.phone, 'Phone number')
			: undefined,
		organization,
		jobTitle: jobTitleRaw
			? requireLength(jobTitleRaw, FIELD_LIMITS.jobTitle, 'Job title')
			: undefined,
		organizationType,
		organizationSize: assertOrgSize(asString(form.get('organizationSize')) || undefined),
		interests: filterInterests(form.getAll('interests').map(asString).filter(Boolean)),
		expectedUsers: expectedUsersRaw
			? requireLength(expectedUsersRaw, FIELD_LIMITS.expectedUsers, 'Expected users')
			: undefined,
		goals: goalsRaw ? requireLength(goalsRaw, FIELD_LIMITS.goals, 'Goals') : undefined,
	};
}

function parseGeneral(form: FormData): GeneralPayload {
	const name = requireLength(asString(form.get('name')), FIELD_LIMITS.name, 'Name');
	const email = requireEmail(asString(form.get('email')));
	const role = assertRole(asString(form.get('role')));
	const subject = assertSubject(asString(form.get('subject')));
	const message = requireLength(asString(form.get('message')), FIELD_LIMITS.message, 'Message');
	const organizationRaw = asString(form.get('organization'));

	if (!name || !message) {
		throw new FormValidationError('Please complete all required contact fields.');
	}

	return {
		type: 'general',
		name,
		email,
		organization: organizationRaw
			? requireLength(organizationRaw, FIELD_LIMITS.organization, 'Organization')
			: undefined,
		role,
		subject,
		message,
	};
}

/** Parse and validate contact FormData into a typed payload. */
export function parseContactForm(form: FormData): ContactPayload {
	assertHoneypotEmpty(form);
	const type = asString(form.get('type'));
	if (type === 'demo') return parseDemo(form);
	if (type === 'general') return parseGeneral(form);
	throw new FormValidationError('Unknown form type.');
}
