import { readEnv, type EnvBag } from './config';

type SiteverifyResponse = {
	success?: boolean;
	'error-codes'?: string[];
};

/**
 * Canonical Turnstile siteverify. Call from the server only — never from the browser.
 * Secret must come from env (`TURNSTILE_SECRET`); never hard-code it.
 */
export async function verifyTurnstileToken(input: {
	token: FormDataEntryValue | null;
	remoteip?: string;
	runtimeEnv?: EnvBag;
}): Promise<boolean> {
	const token = typeof input.token === 'string' ? input.token.trim() : '';
	if (!token) return false;

	const secret = readEnv('TURNSTILE_SECRET', input.runtimeEnv);
	const body = new URLSearchParams({
		secret,
		response: token,
	});
	if (input.remoteip) {
		body.set('remoteip', input.remoteip);
	}

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	});

	const result = (await response.json()) as SiteverifyResponse;
	return result.success === true;
}

/** Public site key (safe to expose). Prefer env; fallback is the dashboard widget. */
export function getTurnstileSiteKey(): string {
	const fromEnv =
		typeof import.meta !== 'undefined'
			? (import.meta.env as EnvBag).PUBLIC_TURNSTILE_SITEKEY
			: undefined;
	if (fromEnv && !fromEnv.includes('xxxxxxxx')) return fromEnv;
	return '0x4AAAAAAD8SH4NH3sQAgfm8';
}
