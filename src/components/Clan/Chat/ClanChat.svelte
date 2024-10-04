<script lang="ts">
	import { ready } from '$lib/auth';
	import { type ClanChatMessage, ClanMemberRole, getMessages, sendChatMessage } from '$lib/api';
	import ChatMessage from './ChatMessage.svelte';

	export let ClanId: number;

	let newMessage: string = '';

	let messages: ClanChatMessage[] = [];

	let TESTmessages: ClanChatMessage[] = [
		{
			clanMember: {
				user: {
					profile: {
						displayName: 'testy',
						profilePicture: '/favicon.png'
					},
					id: -1
				},
				role: ClanMemberRole.Member
			},
			message: 'hello this is an awesome and long test message',
			id: -1,
			created: new Date(180000000)
		},
		{
			clanMember: {
				user: {
					profile: {
						displayName: 'testy',
						profilePicture: '/favicon.png'
					},
					id: -1
				},
				role: ClanMemberRole.Member
			},
			message: 'hello this is an awesome and long test message',
			id: -1,
			created: new Date(180000000)
		}
	];


	if ($ready) {
		getMessages(ClanId).then((result) => {
			if (result.status !== 200) {
				return;
			}

			messages = result.data.sort(d => d.created);
		});
	}

	function send() {
		sendChatMessage(ClanId, newMessage).then((res) => {
			newMessage = '';
		});
	}

</script>

<div class="block relative p-2 mr-2 rounded-lg h-96 overflow-auto pb-5 scrollbar-thin">
	{#each messages as message}
		<ChatMessage ChatMessage="{message}" />
	{/each}
	<div
		class="absolute w-full h-full block inset-0 bg-gradient-to-t from-black/90 to-transparent from-0% to-10% "></div>
</div>

<input
	on:keypress={(ev) => {
	if(ev.key === "Enter"){
		send()
	}
}}
	placeholder="Enter a message" type="text" class="w-full h-10 text-sm"
	bind:value={newMessage}
>
