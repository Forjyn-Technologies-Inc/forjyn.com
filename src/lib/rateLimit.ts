/**
 * Best-effort per-key rate limiting via the Workers Cache API.
 * Complements Turnstile; not a substitute for Cloudflare dashboard Rate Limiting.
 */

export type RateLimitResult = {
	ok: boolean;
	retryAfterSec?: number;
};

export async function enforceRateLimit(input: {
	key: string;
	limit: number;
	windowSec: number;
}): Promise<RateLimitResult> {
	const cache = caches.default;
	const cacheKey = new Request(
		`https://rate-limit.forjyn.internal/${encodeURIComponent(input.key)}`,
	);

	const now = Date.now();
	let count = 0;
	let resetAt = now + input.windowSec * 1000;

	const existing = await cache.match(cacheKey);
	if (existing) {
		const priorCount = Number(existing.headers.get('X-RateLimit-Count') ?? '0');
		const priorReset = Number(existing.headers.get('X-RateLimit-Reset') ?? '0');
		if (Number.isFinite(priorReset) && priorReset > now) {
			count = Number.isFinite(priorCount) ? priorCount : 0;
			resetAt = priorReset;
		}
	}

	count += 1;
	if (count > input.limit) {
		return {
			ok: false,
			retryAfterSec: Math.max(1, Math.ceil((resetAt - now) / 1000)),
		};
	}

	const ttlSec = Math.max(1, Math.ceil((resetAt - now) / 1000));
	await cache.put(
		cacheKey,
		new Response('ok', {
			headers: {
				'X-RateLimit-Count': String(count),
				'X-RateLimit-Reset': String(resetAt),
				'Cache-Control': `max-age=${ttlSec}`,
			},
		}),
	);

	return { ok: true };
}
