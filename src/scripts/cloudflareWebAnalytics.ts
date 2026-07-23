/**
 * Idle-deferred Cloudflare Web Analytics beacon.
 * Token is read from #cf-web-analytics[data-token] (public by design).
 */
function injectBeacon(token: string): void {
	if (document.querySelector('script[data-cf-beacon]')) return;
	const script = document.createElement('script');
	script.defer = true;
	script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
	script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
	document.body.appendChild(script);
}

function init(): void {
	const host = document.getElementById('cf-web-analytics');
	const token = host?.dataset.token?.trim();
	if (!token) return;

	const schedule = () => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => injectBeacon(token), { timeout: 4000 });
		} else {
			setTimeout(() => injectBeacon(token), 1);
		}
	};

	if (document.readyState === 'complete') {
		schedule();
	} else {
		window.addEventListener('load', schedule, { once: true });
	}
}

init();
