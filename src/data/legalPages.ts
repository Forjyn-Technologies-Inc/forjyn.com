export interface LegalPageMeta {
	slug: string;
	/** Markdown filename in src/content/legal (without .md). */
	content: string;
	/** Footer / nav label when it differs from the document title. */
	navLabel?: string;
}

/**
 * Legal page registry. Body copy lives in src/content/legal/*.md.
 * Cookie Policy was retired — cookies/tracking are covered in Privacy Policy §8B.
 */
export const legalPages: LegalPageMeta[] = [
	{ slug: 'privacy', content: 'privacy' },
	{ slug: 'terms', content: 'terms', navLabel: 'Terms of Use' },
	{ slug: 'investment-disclaimer', content: 'disclaimers', navLabel: 'Disclaimers' },
	{ slug: 'accessibility', content: 'accessibility' },
];

export function getLegalPage(slug: string): LegalPageMeta | undefined {
	return legalPages.find((page) => page.slug === slug);
}
