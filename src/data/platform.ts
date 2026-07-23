export const onboardingCapabilities = [
	'Email and password registration',
	'Secure login',
	'Password recovery',
	'Guided profile setup',
	'Role selection',
	'Multi-factor authentication',
	'Session management',
	'Role-based permissions',
];

export const roles = [
	{
		title: 'Startup',
		body: 'Access company profile tools, startup analytics, investor interest, evaluations, documents, events, and due diligence rooms.',
	},
	{
		title: 'Investor',
		body: 'Access startup discovery, preferences, matches, pipeline tools, due diligence, portfolio tracking, events, and compliance status.',
	},
	{
		title: 'Ecosystem Partner',
		body: 'Access community tools, referrals, startup engagement, programming, events, and reporting based on organizational permissions.',
	},
	{
		title: 'Moderator',
		body: 'Manage approved platform areas such as content, events, or member activity without receiving unrestricted administrative access.',
	},
	{
		title: 'Administrator',
		body: 'Manage users, compliance, platform content, evaluations, campaigns, and reporting.',
	},
	{
		title: 'Super Administrator',
		body: 'Access advanced system configuration and the highest level of platform permissions.',
	},
];

export const complianceCapabilities = [
	'Know Your Customer identity verification',
	'Identity document uploads',
	'Anti–Money Laundering screening',
	'Accredited investor verification',
	'Compliance status tracking',
	'Required next-step notifications',
	'Secure compliance document vault',
	'Administrative review queue',
	'Approval and rejection workflows',
	'Compliance-related audit records',
];

export const discoveryActions = ['Like', 'Pass', 'Priority interest', 'Undo', 'Save', 'View profile', 'Review match score'];

export const matchingFactors = [
	'Industry',
	'Stage',
	'Geography',
	'Check size',
	'Business model',
	'Investor preferences',
	'Startup attributes',
	'Platform engagement',
	'Other configurable criteria',
];

export const profileComponents = [
	'Overview',
	'Product',
	'Market',
	'Traction',
	'Business model',
	'Financial information',
	'Funding',
	'Team',
	'Pitch video',
	'Pitch deck',
	'Company documents',
	'Cap table information',
	'Visibility settings',
	'AI evaluation status',
];

export const studioTools = [
	'Pitch video upload',
	'Pitch deck upload',
	'Supporting document management',
	'Profile editing',
	'Media management',
	'Evaluation preparation',
	'Investment-readiness content',
];

export const evaluationWorkflow = [
	'Evaluation status',
	'Step-by-step progress',
	'Completeness analysis',
	'Credibility considerations',
	'Missing-information identification',
	'Administrative monitoring',
	'Evaluation cancellation controls',
	'Re-evaluation following profile updates',
];

export const diligenceFeatures = [
	'Private rooms',
	'Permission-based access',
	'Document checklists',
	'File uploads',
	'Document categorization',
	'Version management',
	'Investor questions',
	'Founder responses',
	'Administrative notes',
	'AI-supported summaries',
	'Document review assistance',
	'Activity history',
];

export const paymentCapabilities = [
	'Investor membership subscriptions',
	'Recurring billing',
	'Membership tier management',
	'Payment status',
	'Investment commitment records',
	'Pledged amount tracking',
	'Payment-related notifications',
	'Fund-management integration hooks',
];

export const eventTools = [
	'Event calendar',
	'Registration',
	'Capacity controls',
	'Participant lists',
	'QR or token-based check-in',
	'Automated reminders',
	'Email notifications',
	'Push notifications',
	'Attendance tracking',
	'Virtual, hybrid, and in-person event support',
];

export const communicationTools = [
	'Transactional emails',
	'Verification emails',
	'Match notifications',
	'Due diligence requests',
	'Event reminders',
	'Platform announcements',
	'Rich HTML email campaigns',
	'Audience segmentation',
	'In-app notifications',
	'Mobile push notifications',
	'Status-change alerts',
];

export const engagementFeatures = [
	'Participation credits',
	'Deal review activity',
	'Community contribution tracking',
	'Leaderboards',
	'Member recognition',
	'Engagement history',
	'Activity-based rewards',
];

export const mobileCapabilities = [
	'Native application experience',
	'Mobile startup discovery',
	'Haptic feedback',
	'Device-level push notifications',
	'Mobile event access',
	'On-the-go profile and opportunity review',
];

export const adminCapabilities = [
	{
		title: 'Overview Dashboard',
		body: 'Review platform growth, member activity, onboarding progress, conversion metrics, and system health.',
	},
	{
		title: 'Investor Directory',
		body: 'Search, filter, review, and manage investor accounts.',
	},
	{
		title: 'Startup Directory',
		body: 'Search, filter, review, and manage startup accounts.',
	},
	{
		title: 'Compliance Queue',
		body: 'Review KYC, AML, and accreditation submissions.',
	},
	{
		title: 'AI Evaluation Controls',
		body: 'Start, monitor, manage, or cancel evaluations.',
	},
	{
		title: 'Spotlight and Showcase Configuration',
		body: 'Adjust qualification thresholds and platform visibility criteria.',
	},
	{
		title: 'Qualifying Startup View',
		body: 'Review startups currently meeting selected spotlight or showcase criteria.',
	},
	{
		title: 'Email Campaign Manager',
		body: 'Create and send targeted communications.',
	},
	{
		title: 'Event Management',
		body: 'Create events, manage registration, and monitor attendance.',
	},
	{
		title: 'System Logs',
		body: 'Review technical events and system activity.',
	},
	{
		title: 'Audit Trail',
		body: 'Inspect protected records of sensitive administrative actions.',
	},
	{
		title: 'Moderator Permissions',
		body: 'Delegate limited responsibilities without providing full administrative access.',
	},
];

export const securityArchitecture = [
	'AES-256-GCM encryption',
	'Field-level encryption for sensitive information',
	'Encrypted document storage',
	'Role-based server-side middleware',
	'Administrative MFA controls',
	'Secure user sessions',
	'Permission enforcement',
	'Protected file access',
	'Audit logging',
	'Append-only sensitive-action records',
	'Checksummed audit trails',
	'Access monitoring',
];

export const integrations = [
	{
		title: 'Stripe',
		body: 'Membership subscriptions, billing, payments, and commitment-related functionality.',
	},
	{
		title: 'Resend',
		body: 'Transactional email delivery, reminders, verification messages, and campaign communications.',
	},
	{
		title: 'OpenAI and xAI',
		body: 'AI-supported evaluations, matching insights, summaries, and document analysis.',
	},
	{
		title: 'Object Storage',
		body: 'Secure file and media hosting.',
	},
	{
		title: 'Authentication Providers',
		body: 'Secure login and authentication capabilities for platform users.',
	},
	{
		title: 'Capacitor',
		body: 'iOS and Android application deployment.',
	},
];

export const sectionNav = [
	{ href: '#discovery', label: 'Discovery' },
	{ href: '#ai', label: 'AI' },
	{ href: '#due-diligence', label: 'Due Diligence' },
	{ href: '#compliance', label: 'Compliance' },
	{ href: '#admin', label: 'Admin' },
	{ href: '#security', label: 'Security' },
	{ href: '#integrations', label: 'Integrations' },
];
