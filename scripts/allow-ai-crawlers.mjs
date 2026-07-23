#!/usr/bin/env node
/**
 * Creates/updates a Cloudflare WAF custom rule that skips security checks for
 * AI search crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot).
 *
 * Requires a Cloudflare API token with Zone → Firewall Services → Edit:
 *   export CLOUDFLARE_API_TOKEN=...
 *   export CLOUDFLARE_ZONE_ID=f427c1fa926c8138da19f8ac0aefd229  # optional
 *
 * Also disable Security → Bots → Bot Fight Mode → “Block AI Bots” in the dashboard
 * (that Free-plan toggle returns 403 before custom skip rules can help).
 */
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || 'f427c1fa926c8138da19f8ac0aefd229';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const RULE_DESCRIPTION = 'Allow AI search crawlers (SEO/AEO)';

const EXPRESSION =
	'(http.user_agent contains "GPTBot") or (http.user_agent contains "ClaudeBot") or (http.user_agent contains "PerplexityBot") or (http.user_agent contains "OAI-SearchBot")';

if (!TOKEN) {
	console.error('Missing CLOUDFLARE_API_TOKEN. Create a token with Zone WAF Edit, then re-run.');
	process.exit(1);
}

async function api(path, opts = {}) {
	const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
		...opts,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
			...(opts.headers || {}),
		},
	});
	const body = await res.json();
	if (!body.success) {
		const err = new Error(JSON.stringify(body.errors || body, null, 2));
		err.status = res.status;
		throw err;
	}
	return body.result;
}

async function main() {
	const phase = 'http_request_firewall_custom';
	let entry;
	try {
		entry = await api(`/zones/${ZONE_ID}/rulesets/phases/${phase}/entrypoint`);
	} catch (e) {
		if (e.status === 404) {
			entry = await api(`/zones/${ZONE_ID}/rulesets`, {
				method: 'POST',
				body: JSON.stringify({
					name: 'default',
					kind: 'zone',
					phase,
					rules: [
						{
							description: RULE_DESCRIPTION,
							expression: EXPRESSION,
							action: 'skip',
							action_parameters: { ruleset: 'current' },
							logging: { enabled: true },
							enabled: true,
						},
					],
				}),
			});
			console.log('Created entry point ruleset with AI crawler skip rule:', entry.id);
			return;
		}
		throw e;
	}

	const existing = (entry.rules || []).find((r) => r.description === RULE_DESCRIPTION);
	const rulePayload = {
		description: RULE_DESCRIPTION,
		expression: EXPRESSION,
		action: 'skip',
		action_parameters: {
			ruleset: 'current',
			phases: [
				'http_request_firewall_managed',
				'http_request_sbfm',
				'http_request_firewall_custom',
			],
			products: ['bic', 'hot', 'rateLimit', 'securityLevel', 'uaBlock', 'waf', 'zoneLockdown'],
		},
		logging: { enabled: true },
		enabled: true,
		position: { index: 1 },
	};

	if (existing) {
		await api(`/zones/${ZONE_ID}/rulesets/${entry.id}/rules/${existing.id}`, {
			method: 'PATCH',
			body: JSON.stringify(rulePayload),
		});
		console.log('Updated AI crawler skip rule:', existing.id);
	} else {
		const created = await api(`/zones/${ZONE_ID}/rulesets/${entry.id}/rules`, {
			method: 'POST',
			body: JSON.stringify(rulePayload),
		});
		console.log('Created AI crawler skip rule:', created.id);
	}
}

main().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
