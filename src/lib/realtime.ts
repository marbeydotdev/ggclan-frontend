import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { settings } from '$lib/configuration';
import { token } from '$lib/auth';
import { get } from 'svelte/store';
import { toast, toastType } from '$lib/toasts';
import { browser } from '$app/environment';

let connectionStarted: boolean = false;
export let connection: HubConnection;

if (browser) {
	token.subscribe((currentToken) => {
		if (connectionStarted) {
			return;
		}
		if (currentToken === null) {
			return;
		}

		connection = new HubConnectionBuilder()
			.withUrl(settings.apiDomain + '/realtime', { accessTokenFactory: () => get(token)! })
			.withAutomaticReconnect()
			.build();

		connectionStarted = true;

		connection.on('notification', (message) => {
			toast(message, toastType.Info);
		});

		connection
			.start()
			.then(() => {
				console.log('realtime connection started');
			})
			.catch(() => {
				toast('Realtime connection failed.', toastType.Warning);
			});
	});
}

export async function StartClanChatListen(clanId: number) {
	if (connection.state !== HubConnectionState.Connected) {
		setTimeout(() => {
			StartClanChatListen(clanId);
		}, 1000);
		return;
	}

	await connection.send('StartClanChatListen', clanId);
}

export async function StopClanChatListen(clanId: number) {
	await connection.send('StopClanChatListen', clanId);
}
