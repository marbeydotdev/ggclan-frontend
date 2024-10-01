import axios, { type AxiosInstance } from 'axios';
import { toast, toastType } from '$lib/toasts';
import { token, user } from '$lib/auth';
import { get } from 'svelte/store';
import { settings } from '$lib/configuration';
import { browser } from '$app/environment';

export type User = {
	created: string;
	clans: never[];
	profile: { displayName: string; profilePicture: string };
};

export type Clan = {
	id: number;
	name: string;
	description: string;
	private: boolean;
	members: Array<ClanMember>;
};

export type ClanMember = {
	userId: number;
	Role: ClanMemberRole;
};

export enum ClanMemberRole {
	Member,
	Administrator,
	Owner
}

export type SearchResult = { name: string; iconUrl: string; gameId: string };

export function authHeaders() {
	return {
		Authorization: `Bearer ${get(token) ?? ''}`
	};
}

export function apiFactory() {
	if (!browser) {
		return;
	}
	if (localStorage.getItem('token') !== null) {
		const ggApi = axios.create({
			baseURL: settings.apiDomain,
			timeout: 5000,
			headers: authHeaders()
		});
		addIntercepts(ggApi);
		return ggApi;
	}

	const ggApi = axios.create({
		baseURL: settings.apiDomain,
		timeout: 5000
	});

	addIntercepts(ggApi);
	return ggApi;
}

function addIntercepts(apiObj: AxiosInstance) {
	apiObj.interceptors.response.use(
		function (response) {
			// Optional: Do something with response data
			return response;
		},
		function (error) {
			toast(error.message, toastType.Error);
			return Promise.reject(error);
		}
	);
}

export async function gameSearch(query: string): Promise<Array<SearchResult>> {
	const result = await apiFactory()!.get('game/list', { params: { query: query } });
	return result.data;
}

export async function getMe() {
	const result = await apiFactory()!.get('/user/me');
	return result.data;
}

export async function updateMe(profile: User['profile']) {
	const result = await apiFactory()!.post('/user/update', profile);
	if (result.status !== 200) {
		toast('Failed to update user profile.', toastType.Error);
		return;
	}

	const u = get(user);
	u!.profile = profile;
	user.set(u);

	toast('Updated user profile.', toastType.Success);
}

export async function getClans(page: number = 0) {
	const result = await apiFactory()!.get('/clan/list', { params: { page: page } });
	return result.data;
}

export async function getClan(clanId: number) {
	const result = await apiFactory()!.get('clan/get/' + clanId);
	return result;
}

export async function getMyClans(page: number = 0) {
	const result = await apiFactory()!.get('/clan/list/me', { params: { page: page } });
	return result.data;
}

export async function createClan(name: string, description: string, priv: boolean) {
	const result = await apiFactory()!.post(`/clan/create`, { name, description, private: priv });
	if (result.status !== 200) {
		toast('Failed to create clan.', toastType.Error);
	}
	return result;
}
