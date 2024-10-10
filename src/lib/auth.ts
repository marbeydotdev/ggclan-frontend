import { createAuth0Client } from '@auth0/auth0-spa-js';
import { type Writable, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { getMe, type User } from '$lib/api';
import { browser } from '$app/environment';
import { settings } from '$lib/configuration';

export let token: Writable<string | null>;
export let user: Writable<User | null>;
export const ready: Writable<boolean> = writable(false);

const userKey = 'user';
const tokenKey = 'token';

async function authClientFactory() {
	return await createAuth0Client({
		domain: 'dev-v6k2m4w3utyj8q38.us.auth0.com',
		clientId: 'KEJMJxNegOkkqLuW64gFMCm69AUEXcf3',
		authorizationParams: {
			redirect_uri: settings.redirectUri,
			audience: 'ggclan502'
		}
	});
}

function setupStores() {
	token = writable(localStorage.getItem(tokenKey));
	user = writable(JSON.parse(localStorage.getItem(userKey) || 'null'));

	token.subscribe((value) => {
		if (value === null) {
			localStorage.removeItem(tokenKey);
			return;
		}

		localStorage.setItem(tokenKey, value);
	});

	user.subscribe((value) => {
		if (value === null) {
			localStorage.removeItem(userKey);
			return;
		}

		localStorage.setItem(userKey, JSON.stringify(value));
	});
}

async function checkAuth0() {
	if (
		location.search.includes('state=') &&
		(location.search.includes('code=') || location.search.includes('error='))
	) {
		const authClient = await authClientFactory();
		await authClient.handleRedirectCallback();
		token.set(await authClient.getTokenSilently());
		user.set(await getMe());
		console.log('we are logged in');
		goto('/');
	}
}

export async function login() {
	const authClient = await authClientFactory();
	await authClient.loginWithRedirect();
}

export async function logout() {
	if (browser) {
		localStorage.removeItem(tokenKey);
		localStorage.removeItem(userKey);
	}
	const authClient = await authClientFactory();
	await authClient.logout({ logoutParams: { returnTo: settings.redirectUri } });
}

if (browser) {
	setupStores();
	checkAuth0().then(() => {
		ready.set(true);
	});
}
