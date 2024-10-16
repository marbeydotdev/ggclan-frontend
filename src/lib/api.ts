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
	game: string;
	private: boolean;
};

export type Achievement = {
	id: number;
	created: Date;
	name: string;
	description: string;
	rarity: number;
};

export type ClanMember = {
	user: {
		id: number;
		profile: {
			displayName: string;
			profilePicture: string;
		};
	};
	clanId: number;
	role: ClanMemberRole;
	created: Date;
};

export type ClanChatMessage = {
	id: number;
	message: string;
	created: Date;
	clanMember: ClanMember;
};

export enum ClanMemberRole {
	Member,
	Administrator,
	Owner
}

export type ClanInvite = {
	id: number;
	user: User;
	message: string;
};

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

export async function getClans(page: number = 0, search: string = '') {
	const result = await apiFactory()!.get('/clan/browse', {
		params: { page: page, search: search }
	});
	return result;
}

export async function getClan(clanId: number) {
	const result = await apiFactory()!.get('clan/get/' + clanId);
	return result;
}

export async function getMyClans(page: number = 0) {
	const result = await apiFactory()!.get('/clan/browse/me', { params: { page: page } });
	return result.data;
}

export async function createClan(name: string, description: string, priv: boolean, game: string) {
	const result = await apiFactory()!.post(`/clan/create`, {
		name: name,
		description: description,
		private: priv,
		game: game
	});
	if (result.status !== 200) {
		toast('Failed to create clan.', toastType.Error);
	}
	return result;
}

export async function getMessages(clanId: number, skip: number = 0, limit: number = 20) {
	const result = await apiFactory()!.get('/chat/messages/' + clanId, {
		params: { limit: limit, skip: skip }
	});
	if (result.status !== 200) {
		toast('Failed to get messages.', toastType.Error);
	}
	return result;
}

export async function sendChatMessage(clanId: number, message: string) {
	const result = await apiFactory()!.post(`/chat/messages/` + clanId, { message: message });
	if (result.status !== 200) {
		toast('Failed to send messages.', toastType.Error);
	}
	return result;
}

export async function getAchievements() {
	const result = await apiFactory()!.get('/achievements/get');
	if (result.status !== 200) {
		toast('Failed to get achievements.', toastType.Error);
	}
	return result;
}

export async function getInvites(clanId: number) {
	const result = await apiFactory()!.get('/clan/get/' + clanId + '/invites');
	if (result.status !== 200) {
		toast('Failed to get invites.', toastType.Error);
	}
	return result;
}

export async function sendInvite(clanId: number) {
	const result = await apiFactory()!.post('/clan/join/' + clanId);
	if (result.status !== 200) {
		toast('Failed to send invite.', toastType.Error);
	}
	return result;
}

export async function acceptInvite(inviteId: number) {
	const result = await apiFactory()!.post(`/clan/invite/accept/${inviteId}`);
	if (result.status !== 200) {
		toast('Failed to accept.', toastType.Error);
	}
	return result;
}

export async function denyInvite(inviteId: number) {
	const result = await apiFactory()!.post(`/clan/invite/deny/${inviteId}`);
	if (result.status !== 200) {
		toast('Failed to accept.', toastType.Error);
	}
	return result;
}

export async function getFriends() {
	const result = await apiFactory()!.get('user/friends');
	if (result.status !== 200) {
		toast('Failed to get friends.', toastType.Error);
	}
	return result.data;
}

export async function getMembers(clanId: number) {
	const result = await apiFactory()!.get('/members/' + clanId);
	if (result.status !== 200) {
		toast('Failed to get members.', toastType.Error);
	}
	return result;
}
