/**
 * Future deal-flow authorization surface (BOLA/IDOR).
 *
 * The marketing site has no authenticated resource APIs today.
 * When sessions ship, every read/write that accepts a resource ID MUST:
 * 1. Resolve the caller via a verified session (never trust client-supplied userId).
 * 2. Load the resource server-side by ID.
 * 3. Call assertResourceAccess (or equivalent) before returning/mutating data.
 *
 * See SECURITY.md for the full checklist.
 */

export type AuthPrincipal = {
	userId: string;
	organizationIds: readonly string[];
	roles: readonly string[];
};

export type ProtectedResource = {
	id: string;
	ownerUserId?: string;
	organizationId?: string;
};

export class UnauthorizedError extends Error {
	override readonly name = 'UnauthorizedError';
	constructor(message = 'Unauthorized') {
		super(message);
	}
}

/**
 * Deny-by-default ownership check. Throws until real auth is wired —
 * calling this from a live handler without implementing sessions fails closed.
 */
export function assertResourceAccess(
	principal: AuthPrincipal | null,
	resource: ProtectedResource | null,
): void {
	if (!principal) {
		throw new UnauthorizedError('Not authenticated');
	}
	if (!resource) {
		throw new UnauthorizedError('Resource not found');
	}

	const ownsAsUser = resource.ownerUserId !== undefined && resource.ownerUserId === principal.userId;
	const ownsAsOrg =
		resource.organizationId !== undefined &&
		principal.organizationIds.includes(resource.organizationId);

	if (!ownsAsUser && !ownsAsOrg) {
		throw new UnauthorizedError('Forbidden');
	}
}
