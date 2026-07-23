export interface SolutionAudiencePage {
	slug: string;
	eyebrow: string;
	title: string;
	lede: string;
	seoTitle: string;
	seoDescription: string;
	anchor: string;
	highlights: string[];
	ctaLabel: string;
	ctaHref: string;
}

export const solutionAudiencePages: SolutionAudiencePage[] = [
	{
		slug: 'startups',
		eyebrow: 'Solutions · Startups',
		title: 'Build, Present and Grow Your Company',
		lede: 'Organize your story, get discovered by relevant investors, understand engagement, and manage due diligence in one secure workspace.',
		seoTitle: 'Startup Solutions | Forjyn Technologies',
		seoDescription:
			'Forjyn startup solutions help founders build investor-ready profiles, get matched, track engagement, and manage due diligence securely.',
		anchor: 'startups',
		highlights: [
			'Guided startup profile builder',
			'Pitch deck and video uploads',
			'AI-supported company evaluation',
			'Investor interest and matching',
			'Profile engagement analytics',
			'Secure due diligence rooms',
		],
		ctaLabel: 'Join as a Startup',
		ctaHref: '/signup?role=startup',
	},
	{
		slug: 'investors',
		eyebrow: 'Solutions · Investors',
		title: 'Discover Opportunities That Match Your Thesis',
		lede: 'Personalized deal discovery, compatibility scoring, pipeline organization, and collaborative due diligence.',
		seoTitle: 'Investor Solutions | Forjyn Technologies',
		seoDescription:
			'Forjyn investor solutions deliver personalized deal discovery, matching scores, pipeline tools, and private due diligence collaboration.',
		anchor: 'investors',
		highlights: [
			'Mobile-first startup discovery',
			'Personalized investment preferences',
			'Compatibility and matching scores',
			'Opportunity shortlists and mutual matches',
			'Portfolio and commitment tracking',
			'Private due diligence collaboration',
		],
		ctaLabel: 'Join as an Investor',
		ctaHref: '/signup?role=investor',
	},
	{
		slug: 'ecosystem',
		eyebrow: 'Solutions · Ecosystem',
		title: 'Give Your Innovation Community Better Infrastructure',
		lede: 'Support founders, coordinate programs and events, manage referrals, and understand ecosystem activity.',
		seoTitle: 'Ecosystem Partner Solutions | Forjyn Technologies',
		seoDescription:
			'Forjyn ecosystem partner tools help accelerators, incubators, and universities manage communities, referrals, events, and reporting.',
		anchor: 'ecosystem',
		highlights: [
			'Community and membership management',
			'Startup referrals and engagement',
			'Event registration and attendance',
			'Communications and announcements',
			'Program and chapter reporting',
			'Administrative permissions',
		],
		ctaLabel: 'Book a Demo',
		ctaHref: '/contact#demo',
	},
	{
		slug: 'service-providers',
		eyebrow: 'Solutions · Service Providers',
		title: 'Help Startups Grow With Less Friction',
		lede: 'Connect your expertise—legal, accounting, talent, technology, and more—to founders who need support.',
		seoTitle: 'Service Provider Solutions | Forjyn Technologies',
		seoDescription:
			'Forjyn service provider solutions connect legal, finance, talent, and growth experts with startups that need trusted support.',
		anchor: 'service-providers',
		highlights: [
			'Visibility to relevant startups',
			'Referral pathways from ecosystem partners',
			'Clear engagement context',
			'Event and community participation',
			'Partnership arrangements where applicable',
		],
		ctaLabel: 'Contact Forjyn',
		ctaHref: '/contact',
	},
	{
		slug: 'enterprise',
		eyebrow: 'Solutions · Enterprise',
		title: 'Enterprise Platform Configurations',
		lede: 'Support multiple teams, programs, communities, or chapters with customized permissions, reporting, and implementation support.',
		seoTitle: 'Enterprise Solutions | Forjyn Technologies',
		seoDescription:
			'Forjyn enterprise configurations support multi-program innovation organizations with custom roles, reporting, and implementation help.',
		anchor: 'ecosystem',
		highlights: [
			'Multi-team and multi-program support',
			'Custom permissions and roles',
			'Centralized analytics and reporting',
			'Implementation consultation',
			'Dedicated partnership pathways',
		],
		ctaLabel: 'Book an Enterprise Demo',
		ctaHref: '/contact#demo',
	},
];
