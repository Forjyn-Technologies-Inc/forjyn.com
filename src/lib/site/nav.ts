export interface NavLink {
	label: string;
	href: string;
}

export const primaryNav: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Solutions', href: '/solutions' },
	{ label: 'Platform', href: '/platform' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
	{
		title: 'Platform',
		links: [
			{ label: 'Platform Overview', href: '/platform' },
			{ label: 'Startup Tools', href: '/platform#startup-tools' },
			{ label: 'Investor Tools', href: '/platform#investor-tools' },
			{ label: 'Due Diligence', href: '/platform#due-diligence' },
			{ label: 'AI Evaluations', href: '/platform#ai' },
			{ label: 'Events', href: '/platform#events' },
			{ label: 'Security', href: '/platform#security' },
			{ label: 'Integrations', href: '/platform#integrations' },
		],
	},
	{
		title: 'Solutions',
		links: [
			{ label: 'For Startups', href: '/solutions/startups' },
			{ label: 'For Investors', href: '/solutions/investors' },
			{ label: 'For Ecosystem Partners', href: '/solutions/ecosystem' },
			{ label: 'For Service Providers', href: '/solutions/service-providers' },
			{ label: 'Enterprise Solutions', href: '/solutions/enterprise' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'About', href: '/about' },
			{ label: 'Contact', href: '/contact' },
			{ label: 'Book a Demo', href: '/contact#demo' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'News', href: '/news' },
			{ label: 'Partnerships', href: '/partnerships' },
		],
	},
	{
		title: 'Account',
		links: [
			{ label: 'Sign Up', href: '/signup' },
			{ label: 'Log In', href: '/login' },
			{ label: 'Forgot Password', href: '/forgot-password' },
			{ label: 'Support', href: '/support' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Privacy Policy', href: '/legal/privacy' },
			{ label: 'Terms of Use', href: '/legal/terms' },
			{ label: 'Cookie Policy', href: '/legal/cookies' },
			{ label: 'Acceptable Use Policy', href: '/legal/acceptable-use' },
			{ label: 'Security', href: '/legal/security' },
			{ label: 'Investment Disclaimer', href: '/legal/investment-disclaimer' },
			{ label: 'Accessibility', href: '/legal/accessibility' },
		],
	},
];

export function isActivePath(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname.startsWith(href);
}
