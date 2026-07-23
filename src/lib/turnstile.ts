import { readEnv, type EnvBag } from './config';

export const TURNSTILE_ACTION = 'turnstile-spin-v2';

const ALLOWED_HOSTNAMES = new Set([
	'forjyn.com',
	'www.forjyn.com',
	'localhost',
	'127.0.0.1',
	'forjyn.shrill-thunder-fbe6.workers.dev',
]);

type SiteverifyResponse = {
	success?: boolean;
	action?: string;
	hostname?: string;
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

	if (!response.ok) return false;

	const result = (await response.json()) as SiteverifyResponse;
	if (result.success !== true) return false;

	// Bind verification to this integration's widget action + expected hostnames.
	if (result.action !== TURNSTILE_ACTION) return false;
	if (!result.hostname || !ALLOWED_HOSTNAMES.has(result.hostname)) return false;

	return true;
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
