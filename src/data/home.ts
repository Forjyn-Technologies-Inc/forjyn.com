export const homeAudiences = [
	{
		title: 'For Startups',
		body: 'Build a complete company profile, present your opportunity professionally, receive AI-supported evaluations, monitor investor engagement, and manage due diligence from one secure workspace.',
		href: '/solutions/startups',
		linkLabel: 'Explore Startup Solutions',
	},
	{
		title: 'For Investors',
		body: 'Discover startups based on your preferences, review opportunities efficiently, manage your deal pipeline, collaborate during due diligence, and track your investment activity.',
		href: '/solutions/investors',
		linkLabel: 'Explore Investor Solutions',
	},
	{
		title: 'For Ecosystem Partners',
		body: 'Manage startup communities, create referrals, coordinate events, support founders, communicate with stakeholders, and understand ecosystem activity through centralized reporting.',
		href: '/solutions/ecosystem',
		linkLabel: 'Explore Ecosystem Solutions',
	},
] as const;

export const homeJourney = [
	{
		title: 'Discover',
		body: 'Explore startup opportunities through a mobile-first discovery experience built around investor preferences.',
	},
	{
		title: 'Match',
		body: 'Connect startups and investors using compatibility scoring based on relevant factors such as sector, stage, location, check size, and investment interests.',
	},
	{
		title: 'Evaluate',
		body: 'Use structured company profiles, supporting documents, platform analytics, and AI-assisted evaluations to understand opportunities more clearly.',
	},
	{
		title: 'Collaborate',
		body: 'Bring investors, founders, administrators, and ecosystem stakeholders into secure due diligence environments.',
	},
	{
		title: 'Grow',
		body: 'Track engagement, participate in events, manage relationships, and access the connections required to move forward.',
	},
] as const;

export const homeInvestorCapabilities = [
	'Mobile-first startup discovery',
	'Like, pass, and priority-interest actions',
	'Personalized investment preferences',
	'Compatibility and matching scores',
	'Detailed startup profiles',
	'Pitch videos and presentation materials',
	'Opportunity shortlists',
	'Mutual matches',
	'Portfolio and commitment tracking',
	'Private due diligence collaboration',
] as const;

export const homeStartupCapabilities = [
	'Guided startup profile builder',
	'Market and company information',
	'Pitch deck and document uploads',
	'Pitch video library',
	'AI-supported company evaluation',
	'Investor interest and matching',
	'Profile engagement analytics',
	'Due diligence document management',
	'Secure investor collaboration',
	'Investment-readiness support',
] as const;

export const homeAiCapabilities = [
	{
		title: 'Startup Evaluations',
		body: 'Structured assessments help startups understand the completeness and credibility of their profiles.',
	},
	{
		title: 'Intelligent Matching',
		body: 'Startup and investor information is compared to identify potential alignment.',
	},
	{
		title: 'Due Diligence Assistance',
		body: 'AI-generated summaries can help users review large volumes of information and identify areas requiring further investigation.',
	},
	{
		title: 'Document Insights',
		body: 'Uploaded materials can be analyzed to support review and information organization.',
	},
	{
		title: 'Opportunity Scoring',
		body: 'Platform signals can help investors and administrators identify startups that meet selected criteria.',
	},
] as const;

export const homeDiligenceFeatures = [
	'Private deal-specific rooms',
	'Structured document checklists',
	'Secure file uploads',
	'Document version management',
	'Investor and founder collaboration',
	'Administrative notes and context',
	'AI-assisted summaries',
	'Credibility and completeness insights',
	'Role-based access permissions',
	'Activity and audit records',
] as const;

export const homeEventCapabilities = [
	'Event calendar',
	'Online registration',
	'Participant management',
	'QR code or token-based check-in',
	'Automated reminders',
	'In-app notifications',
	'Email communications',
	'Attendance tracking',
	'Hybrid and in-person event support',
] as const;

export const homeSecurityCapabilities = [
	'AES-256-GCM field-level encryption',
	'Secure document storage',
	'Role-based access control',
	'Multi-factor authentication',
	'Protected administrative functions',
	'Secure session management',
	'Append-only audit logs',
	'Checksummed activity records',
	'Server-side permission enforcement',
	'Compliance review workflows',
] as const;

export const homeDealPreview = [
	{ name: 'Northline Robotics', meta: 'Series A · Climate Tech', score: '96' },
	{ name: 'Lattice Health', meta: 'Seed · Healthtech', score: '91' },
	{ name: 'Orbit Freight', meta: 'Pre-Seed · Logistics', score: '88' },
] as const;

/** Homepage GEO summary — placed near the top of primary content. */
export const homeKeyTakeaways = [
	'Forjyn is an intelligent deal flow platform for startups, investors, and ecosystem partners.',
	'Investors discover matched opportunities; startups present investment-ready profiles.',
	'Secure due diligence rooms replace fragmented email threads and file shares.',
	'AI assists evaluation and matching while human judgment remains in control.',
	'Events, referrals, and collaboration tools keep the wider innovation network connected.',
] as const;

/** Homepage term/definition pairs for AEO (dl/dt/dd). */
export const homeGlossary = [
	{
		term: 'Deal flow',
		definition:
			'The stream of startup investment opportunities investors review, prioritize, and advance through a pipeline.',
	},
	{
		term: 'Intelligent matching',
		definition:
			'Compatibility scoring that compares startup attributes with investor preferences such as sector, stage, location, and check size.',
	},
	{
		term: 'Due diligence room',
		definition:
			'A private, permissioned workspace where founders and investors exchange documents, track requests, and collaborate securely.',
	},
	{
		term: 'Investment-ready profile',
		definition:
			'A structured company record covering product, market, traction, team, funding, and supporting materials for investor review.',
	},
	{
		term: 'Ecosystem partner',
		definition:
			'Accelerators, incubators, universities, and innovation organizations that support founders through programs, referrals, and events.',
	},
] as const;

/** Authoritative external citations for GEO/AEO trust signals. */
export const homeCitations = [
	{
		label: 'U.S. Securities and Exchange Commission — Investor.gov',
		title: 'Private investment funds and investor considerations',
		href: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/private-investment-funds',
	},
	{
		label: 'OECD',
		title: 'SMEs and entrepreneurship policy guidance',
		href: 'https://www.oecd.org/en/topics/smes-and-entrepreneurship.html',
	},
	{
		label: 'NIST',
		title: 'Cybersecurity Framework',
		href: 'https://www.nist.gov/cyberframework',
	},
] as const;

/**
 * Feature comparison rows for a semantic HTML data table.
 * Columns: Dimension | Spreadsheets & email | Standalone CRM | Forjyn platform
 */
export const homeComparisonColumns = [
	'Dimension',
	'Spreadsheets & email',
	'Standalone CRM',
	'Forjyn platform',
] as const;

export const homeComparisonRows = [
	['Startup–investor matching', 'Manual', 'Limited filters', 'Preference-based scoring'],
	['Due diligence workspace', 'Attachments & threads', 'File notes only', 'Permissioned deal rooms'],
	['Ecosystem partners', 'Separate tools', 'Rarely supported', 'Built-in referrals & events'],
	['AI-assisted evaluation', 'None', 'Add-ons vary', 'Integrated, human-supervised'],
	['Audit & access control', 'Ad hoc', 'Role basics', 'RBAC, MFA, audit logs'],
] as const;

/** Multi-perspective GEO statement (balanced viewpoint). */
export const homePerspective = {
	heading: 'A Balanced View of Deal Flow Tools',
	body: 'While some prefer informal networks, spreadsheets, and email for early deal sourcing, industry standards for private-market diligence emphasize organized information, clear records, and independent review. Forjyn is designed for teams that want structured discovery and secure collaboration without replacing human judgment.',
} as const;
