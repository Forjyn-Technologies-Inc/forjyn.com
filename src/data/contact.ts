export const contactOrgTypes = [
	'Startup',
	'Investor',
	'Angel Group',
	'Venture Capital Firm',
	'Family Office',
	'Accelerator',
	'Incubator',
	'University',
	'Government Organization',
	'Economic Development Organization',
	'Corporate Innovation Team',
	'Service Provider',
	'Other',
] as const;

export const contactOrgSizes = [
	'1–10',
	'11–50',
	'51–200',
	'201–500',
	'501+',
	'Not applicable',
] as const;

export const contactInterests = [
	'Startup profiles',
	'Investor deal discovery',
	'Intelligent matching',
	'Due diligence',
	'AI evaluations',
	'Events',
	'Compliance',
	'Membership management',
	'Ecosystem management',
	'Communications',
	'Analytics',
	'Enterprise platform',
	'Partnership opportunities',
] as const;

export const contactRoles = [
	'Startup',
	'Investor',
	'Ecosystem Partner',
	'Service Provider',
	'Media Contact',
	'Other',
] as const;

export const contactSubjects = [
	'Account question',
	'Platform question',
	'Partnership',
	'Sales inquiry',
	'Technical support',
	'Billing',
	'Compliance',
	'Media',
	'Other',
] as const;

export const contactFaqs = [
	{
		q: 'Can startups create an account directly?',
		a: 'Yes. Startups can select the startup role during registration and begin building their company profile.',
	},
	{
		q: 'Can investors sign up directly?',
		a: 'Yes. Investors can create an account and complete their profile. Verification may be required before accessing restricted opportunities.',
	},
	{
		q: 'How do ecosystem partners access the platform?',
		a: 'Ecosystem partners can request a demonstration or contact the Forjyn team to discuss organizational access. Alternatively, they can make an account and get started right away.',
	},
	{
		q: 'Can Forjyn support multiple programs or chapters?',
		a: 'Enterprise configurations may support multiple teams, programs, communities, or chapters with customized permissions and reporting.',
	},
	{
		q: 'Does Forjyn provide technical support?',
		a: 'Yes. Support options depend on the user’s plan and customer agreement.',
	},
	{
		q: 'Can we integrate Forjyn with our existing systems?',
		a: 'Integration options can be discussed during a platform demonstration or implementation consultation.',
	},
] as const;

export const contactSeo = {
	title: 'Contact Forjyn Technologies | Book a Demo',
	description:
		'Contact Forjyn Technologies to book a platform demonstration, ask about startup or investor accounts, explore ecosystem partnerships, or receive account support.',
} as const;
