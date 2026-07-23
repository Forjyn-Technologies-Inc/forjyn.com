export type ContactFormType = 'demo' | 'general';

export interface DemoPayload {
	type: 'demo';
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	organization: string;
	jobTitle?: string;
	organizationType: string;
	organizationSize?: string;
	interests?: string[];
	expectedUsers?: string;
	goals?: string;
}

export interface GeneralPayload {
	type: 'general';
	name: string;
	email: string;
	organization?: string;
	role: string;
	subject: string;
	message: string;
}

export type ContactPayload = DemoPayload | GeneralPayload;
