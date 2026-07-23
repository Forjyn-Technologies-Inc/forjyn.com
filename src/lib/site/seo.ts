/** Canonical public site origin (no trailing slash). */
export const siteOrigin = 'https://forjyn.com';

export const defaultSeo = {
	title: 'Forjyn Deal Flow for Startups & Investors',
	description:
		'Forjyn is an intelligent deal flow platform connecting startups, investors, and ecosystem partners for discovery, due diligence, and fundraising.',
	themeColor: '#0B1020',
	/** Prefer PNG for social crawlers that do not handle SVG well. */
	ogImagePath: '/web-app-manifest-512x512.png',
	ogImageAlt: 'Forjyn Technologies logo',
	ogImageWidth: 512,
	ogImageHeight: 512,
	twitterHandle: undefined as string | undefined,
} as const;

/** Build an absolute URL from a site path. */
export function absoluteUrl(path = '/'): string {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${siteOrigin}${normalized}`;
}

export function toCanonicalPath(pathname: string): string {
	if (pathname === '/' || pathname === '') return '/';
	const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
	const trimmed = withLeading.replace(/\/+$/, '');
	return trimmed === '' ? '/' : trimmed;
}

export const organizationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Forjyn Technologies Inc.',
	url: siteOrigin,
	logo: absoluteUrl('/web-app-manifest-192x192.png'),
	email: 'info@forjyn.com',
	sameAs: [] as string[],
	description: defaultSeo.description,
} as const;

export const websiteJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'Forjyn Technologies',
	url: siteOrigin,
	description: defaultSeo.description,
	publisher: {
		'@type': 'Organization',
		name: 'Forjyn Technologies Inc.',
		url: siteOrigin,
	},
} as const;
