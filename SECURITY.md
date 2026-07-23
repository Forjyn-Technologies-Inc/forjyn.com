# Security

Application-security notes for the Forjyn marketing site and the future deal-flow app.

## Current surface (marketing site)

- One public mutation API: `POST /api/contact` (Resend).
- Controls: Origin allowlist, Turnstile siteverify (`action` + hostname), honeypot, field validation, **KV rate limit** (`SESSION` binding, `rl:` keys; Cache API fallback only if KV missing), sanitized email headers.
- CSP: `script-src` has **no** `'unsafe-inline'`. Executable scripts are bundled modules / CDN hosts. Inline JSON-LD is allowlisted via post-build `sha256-…` hashes (`scripts/csp-script-hashes.mjs`). `style-src 'unsafe-inline'` remains for Astro `inlineStylesheets: 'always'`.
- Login / signup / forgot-password are stubs or lead-gen only — **no sessions, no user object APIs**.

## BOLA / IDOR checklist (when real auth ships)

Every authenticated handler that accepts a resource ID (`dealId`, `organizationId`, `roomId`, etc.) must:

1. **Authenticate** — resolve the caller from a server-side session / JWT validated with the platform secret. Never trust `userId` or `orgId` from the request body alone for authorization.
2. **Load then authorize** — `get(resourceId)` then compare ownership / membership. Do not filter “by ID from the client” without an ownership predicate.
3. **Use `assertResourceAccess`** — see `src/lib/auth/ownership.ts`. Extend it for roles (admin, investor member, etc.) rather than ad-hoc checks.
4. **Fail closed** — missing session or mismatched owner → `401` / `403`, never empty “success” payloads that leak existence unnecessarily where avoidable.
5. **Test** — add tests that user A cannot read/update/delete user B’s deals, diligence rooms, or org settings by swapping IDs in URLs or bodies.

Until that stack exists, BOLA remains **N/A** on this repository’s public surface — do not invent client-side “auth” as a substitute.

## Secrets

- Server secrets via Wrangler / `.dev.vars`: `RESEND_*`, `TURNSTILE_SECRET`.
- Public: `PUBLIC_TURNSTILE_SITEKEY`, analytics beacon token.
- Never commit `.env` / `.dev.vars`.
