/**
 * Shared field constraints for contact/demo form payloads.
 * Keeps validation rules out of route handlers (SRP).
 */

import {
	contactInterests,
	contactOrgSizes,
	contactOrgTypes,
	contactRoles,
	contactSubjects,
} from '../../data/contact';

export const FIELD_LIMITS = {
	name: 120,
	email: 254,
	phone: 40,
	organization: 200,
	jobTitle: 120,
	expectedUsers: 80,
	goals: 4000,
	message: 5000,
	subject: 200,
	interestsMax: 20,
} as const;

/** User-facing validation failures (safe to return to the client). */
export class FormValidationError extends Error {
	override readonly name = 'FormValidationError';
	constructor(message: string) {
		super(message);
	}
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function requireLength(value: string, max: number, label: string): string {
	if (value.length > max) {
		throw new FormValidationError(`${label} is too long (max ${max} characters).`);
	}
	return value;
}

export function requireEmail(value: string): string {
	const email = value.toLowerCase();
	if (!EMAIL_PATTERN.test(email) || email.length > FIELD_LIMITS.email) {
		throw new FormValidationError('Please enter a valid email address.');
	}
	return email;
}

export function assertAllowed<T extends string>(
	value: string,
	allowed: readonly T[],
	label: string,
): T {
	if (!(allowed as readonly string[]).includes(value)) {
		throw new FormValidationError(`Please select a valid ${label}.`);
	}
	return value as T;
}

export function assertRole(value: string): string {
	return assertAllowed(value, contactRoles, 'role');
}

export function assertSubject(value: string): string {
	const trimmed = requireLength(value, FIELD_LIMITS.subject, 'Subject');
	if ((contactSubjects as readonly string[]).includes(trimmed)) return trimmed;
	// Signup express-interest subjects are generated server-side in the page markup.
	if (/^Account interest — .{1,120}$/u.test(trimmed)) return trimmed;
	throw new FormValidationError('Please select a valid subject.');
}

export function assertOrgType(value: string): string {
	return assertAllowed(value, contactOrgTypes, 'organization type');
}

export function assertOrgSize(value: string | undefined): string | undefined {
	if (!value) return undefined;
	return assertAllowed(value, contactOrgSizes, 'organization size');
}

export function filterInterests(values: string[]): string[] {
	const allowed = new Set<string>(contactInterests);
	const filtered = values.filter((v) => allowed.has(v)).slice(0, FIELD_LIMITS.interestsMax);
	return filtered;
}

/** Honeypot: bots fill hidden fields; humans leave them empty. */
export function assertHoneypotEmpty(form: FormData): void {
	const bait = form.get('company_website');
	if (typeof bait === 'string' && bait.trim() !== '') {
		throw new FormValidationError('BOT_TRAP');
	}
}
