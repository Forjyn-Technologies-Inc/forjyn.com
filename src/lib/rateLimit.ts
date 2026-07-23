/**
 * Distributed rate limiting via Cloudflare KV (multi-colo), with Cache API fallback.
 * Complements Turnstile. KV min expirationTtl is 60s.
 */

export type RateLimitResult = {
	ok: boolean;
	retryAfterSec?: number;
};

export type RateLimitKv = {
	get(key: string): Promise<string | null>;
	put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

type Counter = {
	count: number;
	resetAt: number;
};

function parseCounter(raw: string | null, now: number, windowSec: number): Counter {
	const fresh = { count: 0, resetAt: now + windowSec * 1000 };
	if (!raw) return fresh;
	try {
		const parsed = JSON.parse(raw) as Counter;
		if (
			typeof parsed.count === 'number' &&
			typeof parsed.resetAt === 'number' &&
			parsed.resetAt > now
		) {
			return parsed;
		}
	} catch {
		/* reset window */
	}
	return fresh;
}

/** Prefer KV for consistent limits across Cloudflare colos. */
export async function enforceRateLimitKv(input: {
	kv: RateLimitKv;
	key: string;
	limit: number;
	windowSec: number;
}): Promise<RateLimitResult> {
	const storeKey = `rl:${input.key}`;
	const now = Date.now();
	const current = parseCounter(await input.kv.get(storeKey), now, input.windowSec);
	const nextCount = current.count + 1;

	if (nextCount > input.limit) {
		return {
			ok: false,
			retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
		};
	}

	const ttlSec = Math.max(60, Math.ceil((current.resetAt - now) / 1000));
	await input.kv.put(
		storeKey,
		JSON.stringify({ count: nextCount, resetAt: current.resetAt } satisfies Counter),
		{ expirationTtl: ttlSec },
	);

	return { ok: true };
}

/** Local/dev fallback when KV is unavailable. */
export async function enforceRateLimitCache(input: {
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

export async function enforceRateLimit(input: {
	kv?: RateLimitKv | null;
	key: string;
	limit: number;
	windowSec: number;
}): Promise<RateLimitResult> {
	if (input.kv) {
		return enforceRateLimitKv({
			kv: input.kv,
			key: input.key,
			limit: input.limit,
			windowSec: input.windowSec,
		});
	}
	return enforceRateLimitCache({
		key: input.key,
		limit: input.limit,
		windowSec: input.windowSec,
	});
}
