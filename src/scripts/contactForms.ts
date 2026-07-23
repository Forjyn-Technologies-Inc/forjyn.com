export function initContactForms(): void {
	const forms = document.querySelectorAll<HTMLFormElement>('form[data-contact-form]');

	forms.forEach((form) => {
		form.addEventListener('submit', async (event) => {
			event.preventDefault();

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

				const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };

				if (!response.ok || !data.ok) {
					throw new Error(data.error ?? 'Unable to send your message.');
				}

				form.reset();
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

document.addEventListener('DOMContentLoaded', initContactForms);
