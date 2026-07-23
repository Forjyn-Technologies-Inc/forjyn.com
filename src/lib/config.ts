/**
 * Centralized environment access for Cloudflare Workers, Astro, and Node.
 * Presentational code must not read secrets directly — depend on this module.
 */

export type EnvBag = Record<string, string | undefined>;

const PLACEHOLDER = 'xxxxxxxx';

export function readEnv(name: string, runtimeEnv?: EnvBag): string {
	const value =
		runtimeEnv?.[name] ??
		(typeof import.meta !== 'undefined'
			? (import.meta.env as EnvBag)[name]
			: undefined) ??
		(typeof process !== 'undefined' ? process.env[name] : undefined);

	if (!value || value.includes(PLACEHOLDER)) {
		throw new Error(`${name} is not configured`);
	}

	return value;
}

export function getResendConfig(runtimeEnv?: EnvBag): {
	apiKey: string;
	from: string;
	to: string;
} {
	return {
		apiKey: readEnv('RESEND_API_KEY', runtimeEnv),
		from: readEnv('RESEND_FROM', runtimeEnv),
		to: readEnv('RESEND_TO', runtimeEnv),
	};
}
