/** Prepare signup interest fields before FormData is built. */
function prepareSignupInterestForm(form: HTMLFormElement): void {
	const first = form.querySelector('#signup-first-name');
	const last = form.querySelector('#signup-last-name');
	const org = form.querySelector('#signup-organization');
	const goals = form.querySelector('#signup-message');
	const name = form.querySelector('#signup-name');
	const message = form.querySelector('#signup-combined-message');

	if (
		!(first instanceof HTMLInputElement) ||
		!(last instanceof HTMLInputElement) ||
		!(name instanceof HTMLInputElement) ||
		!(message instanceof HTMLInputElement)
	) {
		return;
	}

	name.value = `${first.value.trim()} ${last.value.trim()}`.trim();
	const orgValue = org instanceof HTMLInputElement ? org.value.trim() : '';
	const goalsValue = goals instanceof HTMLTextAreaElement ? goals.value.trim() : '';
	message.value = [
		'Signup interest submitted from forjyn.com/signup.',
		orgValue ? `Organization: ${orgValue}` : '',
		goalsValue ? `Notes: ${goalsValue}` : '',
	]
		.filter(Boolean)
		.join('\n');
}

export function initContactForms(): void {
	const forms = document.querySelectorAll<HTMLFormElement>('form[data-contact-form]');

	forms.forEach((form) => {
		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			event.stopPropagation();

			prepareSignupInterestForm(form);

			const status = form.querySelector<HTMLElement>('[data-form-status]');
			const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
			const originalLabel = submit?.textContent ?? 'Submit';

			if (status) {
				status.textContent = '';
				status.dataset.state = '';
			}

			if (submit) {
				submit.disabled = true;
				submit.textContent = 'Sending…';
			}

			try {
				const response = await fetch('/api/contact', {
					method: 'POST',
					body: new FormData(form),
					headers: { Accept: 'application/json' },
				});

				const contentType = response.headers.get('content-type') ?? '';
				if (!contentType.includes('application/json')) {
					throw new Error(
						'The contact API is not available on this deployment. Redeploy with Cloudflare Workers (`npm run deploy`) and set Resend secrets.',
					);
				}

				const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };

				if (!response.ok || !data.ok) {
					throw new Error(data.error ?? 'Unable to send your message.');
				}

				form.reset();
				const turnstile = (
					window as Window & {
						turnstile?: { reset: (el?: HTMLElement) => void };
					}
				).turnstile;
				if (turnstile) {
					form.querySelectorAll<HTMLElement>('.cf-turnstile').forEach((el) => {
						turnstile.reset(el);
					});
				}
				if (status) {
					status.dataset.state = 'success';
					status.textContent =
						data.message ??
						'Thank you for contacting Forjyn. Your request has been received.';
				}
			} catch (error) {
				if (status) {
					status.dataset.state = 'error';
					status.textContent =
						error instanceof Error
							? error.message
							: 'Unable to send your message. Please try again or email sales@forjyn.com.';
				}
			} finally {
				if (submit) {
					submit.disabled = false;
					submit.textContent = originalLabel;
				}
			}
		});
	});
}

// Capture-phase guard as soon as the module runs (deferred modules still beat user clicks).
document.addEventListener(
	'submit',
	(event) => {
		const target = event.target;
		if (target instanceof HTMLFormElement && target.hasAttribute('data-contact-form')) {
			event.preventDefault();
		}
	},
	true,
);

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initContactForms);
} else {
	initContactForms();
}
