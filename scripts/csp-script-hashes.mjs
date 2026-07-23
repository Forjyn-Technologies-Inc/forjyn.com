#!/usr/bin/env node
/**
 * Post-build: collect sha256 hashes of inline <script> bodies in dist HTML
 * (JSON-LD) and inject them into Content-Security-Policy in dist/_headers
 * so script-src can omit 'unsafe-inline'.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('dist/client');
const HEADERS = path.join(DIST, '_headers');

/** @param {string} dir */
async function* walkHtml(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walkHtml(full);
		} else if (entry.name.endsWith('.html')) {
			yield full;
		}
	}
}

/**
 * Extract inline script bodies (no src=). CSP hashes the raw body bytes.
 * @param {string} html
 */
function inlineScriptBodies(html) {
	const bodies = [];
	const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
	let match;
	while ((match = re.exec(html)) !== null) {
		const attrs = match[1] ?? '';
		if (/\bsrc\s*=/i.test(attrs)) continue;
		bodies.push(match[2] ?? '');
	}
	return bodies;
}

/** @param {string} body */
function sha256Csp(body) {
	const digest = createHash('sha256').update(body, 'utf8').digest('base64');
	return `'sha256-${digest}'`;
}

const hashes = new Set();
for await (const file of walkHtml(DIST)) {
	const html = await readFile(file, 'utf8');
	for (const body of inlineScriptBodies(html)) {
		if (!body.trim()) continue;
		hashes.add(sha256Csp(body));
	}
}

if (hashes.size === 0) {
	console.warn('[csp-script-hashes] No inline scripts found — CSP left unchanged.');
	process.exit(0);
}

const sorted = [...hashes].sort();
let headers = await readFile(HEADERS, 'utf8');
const cspLineRe = /^( {2}Content-Security-Policy: .*)$/m;
const match = headers.match(cspLineRe);
if (!match) {
	console.error('[csp-script-hashes] CSP line not found in dist/_headers');
	process.exit(1);
}

const line = match[1];
const scriptSrcRe = /script-src ([^;]+)/;
const scriptMatch = line.match(scriptSrcRe);
if (!scriptMatch) {
	console.error('[csp-script-hashes] script-src missing from CSP');
	process.exit(1);
}

const existingTokens = scriptMatch[1]
	.split(/\s+/)
	.filter((t) => t && !t.startsWith("'sha256-") && t !== "'unsafe-inline'");

const nextScriptSrc = [...existingTokens, ...sorted].join(' ');
const nextLine = line.replace(scriptSrcRe, `script-src ${nextScriptSrc}`);

headers = headers.replace(cspLineRe, nextLine);
await writeFile(HEADERS, headers, 'utf8');
console.log(`[csp-script-hashes] Injected ${sorted.length} script hash(es) into CSP.`);
