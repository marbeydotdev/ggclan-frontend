import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { get, type Writable, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { authHeaders, getMe, type User } from '$lib/api';
import {browser} from '$app/environment';
import axios from 'axios';
import { settings } from '$lib/configuration';



export let token: Writable<string | null>;
export let user: Writable<User | null>;

let authClient: Auth0Client

const userKey = "user"
const tokenKey = "token"

let ggApi;

if (browser){
	token = writable(localStorage.getItem(tokenKey))
	user = writable(JSON.parse(localStorage.getItem(userKey) || "null"))

	ggApi = axios.create({
		baseURL: settings.apiDomain,
		timeout: 5000,
		headers: {'Authorization': `Bearer ${get(token) ?? ""}`}
	});

	token.subscribe((value) => {
		if (value === null) {
			localStorage.removeItem(tokenKey);
			return;
		}

		localStorage.setItem(tokenKey, value);
	})

	user.subscribe((value) => {
		if (value === null) {
			localStorage.removeItem(userKey);
			return;
		}

		localStorage.setItem(userKey, JSON.stringify(value));
	})

	authClient = await createAuth0Client({
		domain: "dev-v6k2m4w3utyj8q38.us.auth0.com",
		clientId: "KEJMJxNegOkkqLuW64gFMCm69AUEXcf3",
		authorizationParams: {
			redirect_uri: "http://localhost:5173",
			audience: "ggclan502"
		}
	})

	if (location.search.includes("state=") &&
		(location.search.includes("code=") ||
			location.search.includes("error="))) {

		await authClient.handleRedirectCallback();
		goto("/app/account")
	}

	if (get(token) === null){
	  	if (await authClient.isAuthenticated()){
				token.set(await authClient.getTokenSilently())
				user.set((await ggApi.get("user/me", {headers:authHeaders()})).data)
			}
		}
}


export async function login() {
	await authClient.loginWithRedirect();
}

export async function logout() {
	if (browser){
		localStorage.removeItem(tokenKey);
		localStorage.removeItem(userKey);
	}
	await authClient.logout();
}