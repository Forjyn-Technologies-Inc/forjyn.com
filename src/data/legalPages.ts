export interface LegalPage {
	slug: string;
	eyebrow: string;
	title: string;
	seoTitle: string;
	seoDescription: string;
	updated: string;
	sections: { heading: string; paragraphs: string[] }[];
}

export const legalPages: LegalPage[] = [
	{
		slug: 'privacy',
		eyebrow: 'Legal',
		title: 'Privacy Policy',
		seoTitle: 'Privacy Policy | Forjyn Technologies',
		seoDescription:
			'Learn how Forjyn Technologies collects, uses, and protects personal information on forjyn.com and related marketing services.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Overview',
				paragraphs: [
					'Forjyn Technologies Inc. (“Forjyn,” “we,” “us”) respects your privacy. This policy describes how we collect, use, disclose, and safeguard information when you visit forjyn.com, submit forms, or otherwise interact with our marketing site and related communications.',
					'If you use the Forjyn product platform under a customer agreement, additional privacy terms in that agreement may apply.',
				],
			},
			{
				heading: 'Information We Collect',
				paragraphs: [
					'We may collect information you provide directly, including name, email address, phone number, organization, job title, role, and message content when you book a demo, contact us, or express interest in an account.',
					'We may also collect technical data such as IP address, browser type, device information, and pages visited through standard server logs and analytics tools.',
				],
			},
			{
				heading: 'How We Use Information',
				paragraphs: [
					'We use information to respond to inquiries, schedule demonstrations, improve our website, secure our services, send service-related communications, and—where permitted—share relevant product updates.',
					'We do not sell personal information.',
				],
			},
			{
				heading: 'Sharing',
				paragraphs: [
					'We may share information with service providers who assist us (for example email delivery, hosting, and analytics), subject to appropriate confidentiality and security obligations.',
					'We may disclose information if required by law or to protect the rights, safety, and security of Forjyn, our users, or the public.',
				],
			},
			{
				heading: 'Retention and Security',
				paragraphs: [
					'We retain information only as long as needed for the purposes described above, unless a longer period is required by law.',
					'We implement administrative, technical, and organizational measures designed to protect personal information. No method of transmission or storage is completely secure.',
				],
			},
			{
				heading: 'Your Choices',
				paragraphs: [
					'Depending on your location, you may have rights to access, correct, delete, or restrict certain processing of your personal information. Contact us to make a request.',
					'You may unsubscribe from marketing emails using the link in those messages or by contacting us.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: [
					'For privacy questions, email info@forjyn.com or use our contact form at forjyn.com/contact.',
				],
			},
		],
	},
	{
		slug: 'terms',
		eyebrow: 'Legal',
		title: 'Terms of Use',
		seoTitle: 'Terms of Use | Forjyn Technologies',
		seoDescription:
			'Read the Forjyn Technologies Terms of Use governing access to forjyn.com, demos, accounts, and related marketing services.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Acceptance',
				paragraphs: [
					'By accessing forjyn.com, you agree to these Terms of Use. If you do not agree, do not use the site.',
					'Platform product accounts may be governed by separate customer agreements, which control in the event of conflict.',
				],
			},
			{
				heading: 'Informational Purpose',
				paragraphs: [
					'Website content is provided for general informational purposes about Forjyn’s technology and services. It does not constitute investment, legal, tax, accounting, or other professional advice.',
				],
			},
			{
				heading: 'Acceptable Use',
				paragraphs: [
					'You agree not to misuse the site, attempt unauthorized access, interfere with security or availability, scrape content in a manner that burdens our systems, or submit unlawful, harmful, or misleading information.',
				],
			},
			{
				heading: 'Intellectual Property',
				paragraphs: [
					'All trademarks, logos, text, graphics, and other materials on this site are owned by Forjyn or its licensors and are protected by applicable intellectual property laws. You may not copy or redistribute materials without prior written permission, except for personal, non-commercial viewing.',
				],
			},
			{
				heading: 'Disclaimer and Limitation',
				paragraphs: [
					'The site is provided “as is” without warranties of any kind, to the fullest extent permitted by law. Forjyn is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the site.',
				],
			},
			{
				heading: 'Changes',
				paragraphs: [
					'We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: [
					'Questions about these terms: info@forjyn.com.',
				],
			},
		],
	},
	{
		slug: 'cookies',
		eyebrow: 'Legal',
		title: 'Cookie Policy',
		seoTitle: 'Cookie Policy | Forjyn Technologies',
		seoDescription:
			'Learn how Forjyn Technologies uses essential and analytics cookies on forjyn.com to secure the site and improve visitor experience.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'What Are Cookies',
				paragraphs: [
					'Cookies are small text files stored on your device. Similar technologies include local storage and pixels.',
				],
			},
			{
				heading: 'How We Use Them',
				paragraphs: [
					'We may use essential cookies required for site security and basic functionality, and analytics cookies to understand how visitors use the site so we can improve it.',
					'Where required by law, non-essential cookies are used only with your consent.',
				],
			},
			{
				heading: 'Your Choices',
				paragraphs: [
					'You can control cookies through your browser settings. Blocking some cookies may affect site functionality.',
				],
			},
			{
				heading: 'Contact',
				paragraphs: [
					'Questions: info@forjyn.com.',
				],
			},
		],
	},
	{
		slug: 'acceptable-use',
		eyebrow: 'Legal',
		title: 'Acceptable Use Policy',
		seoTitle: 'Acceptable Use Policy | Forjyn Technologies',
		seoDescription:
			'Review Forjyn’s Acceptable Use Policy for prohibited conduct, security expectations, and responsible use of our websites and services.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Purpose',
				paragraphs: [
					'This Acceptable Use Policy explains prohibited activities when using Forjyn websites, communications channels, and—where applicable—platform services.',
				],
			},
			{
				heading: 'Prohibited Conduct',
				paragraphs: [
					'You may not use Forjyn services to engage in fraud, harassment, discrimination, unauthorized access, distribution of malware, spam, infringement of intellectual property, or any activity that violates applicable law.',
					'You may not attempt to bypass authentication, scrape data at abusive rates, or interfere with other users’ access.',
				],
			},
			{
				heading: 'Enforcement',
				paragraphs: [
					'We may investigate suspected violations and suspend or terminate access, report activity to authorities, or take other appropriate action.',
				],
			},
			{
				heading: 'Reporting',
				paragraphs: [
					'Report suspected abuse to support@forjyn.com.',
				],
			},
		],
	},
	{
		slug: 'security',
		eyebrow: 'Legal',
		title: 'Security',
		seoTitle: 'Security | Forjyn Technologies',
		seoDescription:
			'Understand Forjyn Technologies security principles for protecting sensitive company, identity, and investment-related information.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Our Approach',
				paragraphs: [
					'Forjyn designs products with security and controlled access in mind. Our platform architecture includes encryption for sensitive fields, role-based access controls, secure session management, multi-factor authentication where required, and audit logging for sensitive administrative actions.',
				],
			},
			{
				heading: 'Website',
				paragraphs: [
					'Our marketing site is hosted on infrastructure that provides TLS encryption in transit. Contact form submissions are processed through secured APIs and email delivery providers.',
				],
			},
			{
				heading: 'Responsible Disclosure',
				paragraphs: [
					'If you believe you have found a security vulnerability, please email support@forjyn.com with details. Do not publicly disclose the issue until we have had a reasonable opportunity to investigate and remediate.',
				],
			},
		],
	},
	{
		slug: 'investment-disclaimer',
		eyebrow: 'Legal',
		title: 'Investment Disclaimer',
		seoTitle: 'Investment Disclaimer | Forjyn Technologies',
		seoDescription:
			'Read Forjyn’s investment disclaimer: platform information is organizational only and is not investment, legal, or financial advice.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Important Notice',
				paragraphs: [
					'Forjyn Technologies Inc. provides technology and information-management tools for startups, investors, ecosystem organizations, and other platform users.',
					'Unless expressly stated otherwise, Forjyn is not a securities dealer, investment fund, investment adviser, financial adviser, broker, crowdfunding portal, legal adviser, accounting firm, or financial institution.',
					'Information, scores, matches, evaluations, profiles, reports, and AI-generated outputs made available through the platform are provided for informational and organizational purposes only. They do not constitute investment, legal, tax, accounting, financial, or other professional advice.',
					'Nothing on the platform or this website is an offer, recommendation, endorsement, solicitation, or guarantee concerning any company, security, investment, transaction, or outcome.',
					'Users are responsible for conducting their own independent due diligence and obtaining advice from qualified professionals before making business, investment, legal, financial, or tax decisions.',
					'Investment opportunities involve risk, including the possible loss of the entire amount invested.',
				],
			},
		],
	},
	{
		slug: 'accessibility',
		eyebrow: 'Legal',
		title: 'Accessibility',
		seoTitle: 'Accessibility | Forjyn Technologies',
		seoDescription:
			'Learn about Forjyn Technologies’ commitment to accessibility on forjyn.com and how to request assistance with digital content.',
		updated: 'July 23, 2026',
		sections: [
			{
				heading: 'Commitment',
				paragraphs: [
					'Forjyn aims to make forjyn.com usable by as many people as possible. We work toward conformance with widely recognized accessibility guidelines (including WCAG 2.2 Level AA where practicable) through semantic HTML, keyboard-accessible controls, sufficient contrast, and descriptive labels.',
				],
			},
			{
				heading: 'Feedback',
				paragraphs: [
					'If you encounter an accessibility barrier, please contact support@forjyn.com and describe the page and issue. We will review your feedback and work to improve the experience.',
				],
			},
		],
	},
];

export function getLegalPage(slug: string): LegalPage | undefined {
	return legalPages.find((page) => page.slug === slug);
}
