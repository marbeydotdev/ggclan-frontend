import axios from 'axios';
import { toast, toastType } from '$lib/toasts';
import { token } from '$lib/auth';
import { get } from 'svelte/store';
import { settings } from '$lib/configuration';

export type User = { created: string; clans: never[]; id: number; profile: {displayName: string, profilePicture: string, bannerPicture: string} }

export const ggApi = axios.create({
	baseURL: settings.apiDomain,
	timeout: 5000
});

export function authHeaders(){
	return {
		"Authorization": `Bearer ${get(token) ?? ""}`
	}
}

ggApi.interceptors.response.use(
	function (response) {
		// Optional: Do something with response data
		return response;
	},
	function (error) {
		toast(error.message, toastType.Error);
		return Promise.reject(error);
	}
);

export type SearchResult = { name: string; iconUrl: string; gameId: string };

export async function gameSearch(query: string): Promise<Array<SearchResult>> {
	const result = await ggApi.get('game/list', { params: { query: query } });
	return result.data;
}

export async function getMe(){
	const result = await ggApi.get('/user/me', {headers: authHeaders()});
	return result.data;
}