/**
 * Centralized environment access for Cloudflare Workers, Astro, and Node.
 * Presentational code must not read secrets directly — depend on this module.
 */

/** String secrets / public keys. May also carry KV bindings when passed as full Worker env. */
export type EnvBag = Record<string, unknown>;

const PLACEHOLDER = 'xxxxxxxx';

function asString(value: unknown): string | undefined {
	return typeof value === 'string' ? value : undefined;
}

export function readEnv(name: string, runtimeEnv?: EnvBag): string {
	const value =
		asString(runtimeEnv?.[name]) ??
		(typeof import.meta !== 'undefined'
			? asString((import.meta.env as EnvBag)[name])
			: undefined) ??
		(typeof process !== 'undefined' ? asString(process.env[name]) : undefined);

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
