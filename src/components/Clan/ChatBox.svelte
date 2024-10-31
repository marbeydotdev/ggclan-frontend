<script lang="ts">
	import SendIcon from 'virtual:icons/mdi/send';
	import { type ClanChatMessage, ClanMemberRole, getMessages, sendChatMessage } from '$lib/api';
	import { onDestroy, onMount } from 'svelte';

	let { clanId }: { clanId: number } = $props();

	function retrieveMessages() {
		console.log(clanId);
		getMessages(clanId.valueOf()).then((clanMessages) => {
			messages = (clanMessages.data as ClanChatMessage[]).sort(m => Number(m.created)).reverse();
			chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
		});
	}

	function sendMessage() {
		sendChatMessage(clanId, newChatMessage).then(() => {
			newChatMessage = '';
			retrieveMessages();
		});
	}

	function onChatKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}

	let newChatMessage: string = $state('');
	let chatBox: HTMLDivElement;
	let messageRetrieveInterval: ReturnType<typeof setInterval>;
	let messages: ClanChatMessage[] = $state([]);

	onMount(() => {
		retrieveMessages();
		messageRetrieveInterval = setInterval(retrieveMessages, 1000);
	});

	onDestroy(() => {
		clearInterval(messageRetrieveInterval);
	});
</script>
<div class="w-full p-5 dark:bg-zinc-900 bg-zinc-100 rounded-xl flex flex-col gap-4 h-72 overflow-y-auto">
	<div class="flex flex-col h-60 gap-4 overflow-auto scrollbar-none" bind:this={chatBox}>
		{#each messages as message}
			<div class="w-full block text-sm">
				<div class="flex items-center gap-2 w-full py-1">
					<img src="{message.clanMember.user.profile.profilePicture}" alt="pfp" class="w-6 h-6 rounded-full">
					<span
						class="block h-5 px-1 rounded-full bg-zinc-100 text-zinc-900 text-sm"
						class:!bg-yellow-500={message.clanMember.role === ClanMemberRole.Owner}
						class:!bg-orange-500={message.clanMember.role === ClanMemberRole.Administrator}>{ClanMemberRole[message.clanMember.role]}</span>
					<span class="block">{message.clanMember.user.profile.displayName}</span>

				</div>
				<p class="ml-8">{message.message}</p>
			</div>
		{/each}
	</div>

	<div class="flex items-center text-zinc-100 mt-auto dark:bg-zinc-950 bg-zinc-50 px-3 py-1 rounded-xl gap-2">
		<input onkeydown="{onChatKeyPress}" bind:value={newChatMessage} type="text"
					 class="block text-sm w-full p-0 rounded-none border-none bg-transparent"
					 placeholder="Enter message...">
		<button onclick="{sendMessage}"
						class="hover:border-zinc-100 border-1 p-2 rounded-xl transition-colors">
			<SendIcon />
		</button>
	</div>
</div>