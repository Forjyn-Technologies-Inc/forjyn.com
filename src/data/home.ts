export const homeAudiences = [
	{
		title: 'For Startups',
		body: 'Build a complete company profile, present your opportunity professionally, receive AI-supported evaluations, monitor investor engagement, and manage due diligence from one secure workspace.',
		href: '/solutions#startups',
		linkLabel: 'Explore Startup Solutions',
	},
	{
		title: 'For Investors',
		body: 'Discover startups based on your preferences, review opportunities efficiently, manage your deal pipeline, collaborate during due diligence, and track your investment activity.',
		href: '/solutions#investors',
		linkLabel: 'Explore Investor Solutions',
	},
	{
		title: 'For Ecosystem Partners',
		body: 'Manage startup communities, create referrals, coordinate events, support founders, communicate with stakeholders, and understand ecosystem activity through centralized reporting.',
		href: '/solutions#ecosystem',
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
	{
		title: 'Intelligent Knowledge Search',
		body: "Ask questions directly within a startup's due diligence room. AI analyzes supporting documentation to deliver accurate, context-aware responses.",
	},
] as const;

export const homeDealPreview = [
	{ name: 'Northline Robotics', meta: 'Series A · Climate Tech', score: '96' },
	{ name: 'Lattice Health', meta: 'Seed · Healthtech', score: '91' },
	{ name: 'Orbit Freight', meta: 'Pre-Seed · Logistics', score: '88' },
] as const;

/**
 * Feature comparison rows for a semantic HTML data table.
 * Columns: Feature | Spreadsheets & Email | Traditional Deal Flow Platforms | Forjyn
 */
export const homeComparisonColumns = [
	'Feature',
	'Spreadsheets & Email',
	'Traditional Deal Flow Platforms',
	'Forjyn',
] as const;

export const homeComparisonRows = [
	['Startup Profiles', 'X', '✓', '✓'],
	['Investor Profiles', 'X', '✓', '✓'],
	['Startup–Investor Matching', 'X', '✓', '✓'],
	['Due Diligence Rooms', 'X', '✓', '✓'],
	['Integrated Messaging', 'X', '✓', '✓'],
	['Role-Based Permissions', 'X', '✓', '✓'],
	['Audit Logs & Activity Tracking', 'X', '✓', '✓'],
	['AI-Powered Matching', 'X', 'X', '✓'],
	['AI Document Intelligence', 'X', 'X', '✓'],
	['Ecosystem Partner Portal', 'X', 'X', '✓'],
	['Referral Management', 'X', 'X', '✓'],
	['Program & Event Management', 'X', 'X', '✓'],
	['Startup Investment Readiness Tools', 'X', 'X', '✓'],
	['Multi-Organization Collaboration', 'X', 'X', '✓'],
] as const;
