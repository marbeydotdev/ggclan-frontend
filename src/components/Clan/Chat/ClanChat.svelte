<script lang="ts">
	import { ready } from '$lib/auth';
	import { type ClanChatMessage, ClanMemberRole, getMessages, sendChatMessage } from '$lib/api';
	import ChatMessage from './ChatMessage.svelte';

	export let ClanId: number;
	let chatBox: HTMLDivElement;
	let newMessage: string = '';

	let messages: ClanChatMessage[] = [];

	function retrieveMessages() {
		getMessages(ClanId).then((result) => {
			if (result.status !== 200) {
				return;
			}
			if (messages.length !== result.data.length) {
				scrollToBottom();
			}
			messages = result.data.sort(d => d.created).reverse();
		});
	}

	if ($ready) {
		retrieveMessages();
		setInterval(() => {
			retrieveMessages();
		}, 1000);
	}

	function scrollToBottom() {
		if (typeof chatBox === 'undefined') {
			return;
		}
		chatBox.scrollTop = chatBox.scrollHeight + 1000;
	}

	function send() {
		sendChatMessage(ClanId, newMessage).then((res) => {
			newMessage = '';
		});
	}

</script>

<div bind:this={chatBox}
		 class="block relative p-2 mr-2 rounded-lg h-96 overflow-auto pb-5 scrollbar-thin">
	{#each messages as message}
		<ChatMessage ChatMessage="{message}" />
	{/each}
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
