export interface NavLink {
	label: string;
	href: string;
}

export const primaryNav: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Solutions', href: '/solutions' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Contact', href: '/contact' },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
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
			{ label: 'Sign Up', href: 'https://app.forjyn.com/register' },
			{ label: 'Log In', href: 'https://app.forjyn.com/login' },
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
			{ label: 'Disclaimers', href: '/legal/investment-disclaimer' },
			{ label: 'Accessibility', href: '/legal/accessibility' },
		],
	},
];

export function isActivePath(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname.startsWith(href);
}
