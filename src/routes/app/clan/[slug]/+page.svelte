<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import {
		acceptInvite,
		type Clan, type ClanChatMessage,
		type ClanInvite,
		type ClanMember,
		ClanMemberRole, denyInvite,
		getClan,
		getInvites,
		getMembers, getMessages, sendChatMessage
	} from '$lib/api';
	import { goto } from '$app/navigation';

	import BackIcon from 'virtual:icons/mdi/arrow-left';
	import PeopleIcon from 'virtual:icons/mdi/people';
	import AddIcon from 'virtual:icons/mdi/check';
	import RemoveIcon from 'virtual:icons/mdi/close';
	import SendIcon from 'virtual:icons/mdi/send';

	onMount(() => {
		clanId = Number($page.params.slug);
		getClan(clanId).then((cl) => {
			clan = (cl.data as Clan);
		}).catch(() => {
			goto('/app');
		});
		retrieveInvitesAndMembers();
		retrieveMessages();
		messageRetrieveInterval = setInterval(retrieveMessages, 1000);
	});

	function retrieveMessages() {
		getMessages(clanId!).then((clanMessages) => {
			messages = clanMessages.data;
			chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
		});
	}

	function retrieveInvitesAndMembers() {
		getInvites(clanId!).then((getInvites) => {
			invites = getInvites.data;
		});
		getMembers(clanId!).then((getMembers) => {
			members = getMembers.data;
		});
	}

	function sendMessage() {
		sendChatMessage(clanId!, newChatMessage).then(() => {
			newChatMessage = '';
			retrieveMessages();
		});
	}

	let clanId: number | null = null;

	let clan: Clan | null = null;
	let members: ClanMember[] = [];
	let invites: ClanInvite[] = [];
	let messages: ClanChatMessage[] = [];

	let showInvites: boolean = false;

	let newChatMessage: string = '';
	let chatBox: HTMLDivElement;
	let messageRetrieveInterval;

	onDestroy(() => {
		clearInterval(messageRetrieveInterval);
	});

</script>

{#if clan !== null}
	<div class="flex items-center">
		<span class="page-header mr-auto">{clan.name}</span>
		<button
			onclick="{() => showInvites = !showInvites}"
			class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<span class="block relative">
				<PeopleIcon />
				<span
					class:!flex={invites.length > 0}
					class="text-xs  justify-center items-center rounded-full bg-red-500 w-4 h-4 absolute top-3 left-2 hidden">{invites.length}</span>
			</span>
		</button>
		<a href="/app/clans"
			 class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<BackIcon />
		</a>
	</div>

	{#if showInvites}
		<div in:fade class="flex gap-2 w-full h-32 mb-5 overflow-clip items-center border-y py-3 border-zinc-800">
			{#if invites.length === 0}
				<small class="block w-full text-zinc-500 text-center">No invites yet.</small>
			{/if}
			{#each invites as invite}
				<div class="w-56 bg-zinc-900 gap-5 h-full p-3 rounded-xl flex-row flex">
					<div class="block">
						<img src="{invite.user.profile.profilePicture}" class="h-14 w-14 bg-zinc-800 p-1 block mx-auto rounded-full"
								 alt="pfp">
						<span class="text-xs block text-center font-medium mt-1">{invite.user.profile.displayName}</span>
					</div>
					<div class="flex flex-col flex-grow">
						<span class="block text-sm font-medium">{invite.user.profile.displayName}</span>
						<p class="text-sm text-zinc-300 block flex-grow">message</p>
						<div class="flex gap-6">
							<button
								onclick="{() => {denyInvite(invite.id); retrieveInvitesAndMembers()}}"
								class="flex w-8 h-8 rounded-full justify-center items-center transition-colors hover:bg-green-500 cursor-pointer">
								<AddIcon />
							</button>
							<button
								onclick="{() => {acceptInvite(invite.id); retrieveInvitesAndMembers()}}"
								class="flex w-8 h-8 rounded-full justify-center items-center transition-colors hover:bg-red-500 cursor-pointer">
								<RemoveIcon />
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex gap-2 w-full h-32 mb-5 overflow-clip">
		{#each members as member}
			<div class="bg-zinc-900 h-full aspect-square p-3 rounded-xl hover-effect cursor-pointer">
				<img src="{member.user.profile.profilePicture}" class="h-14 w-14 bg-zinc-800 p-1 block mx-auto rounded-full"
						 alt="pfp">
				<span
					class:!bg-yellow-500={member.role === ClanMemberRole.Owner}
					class:!bg-orange-500={member.role === ClanMemberRole.Administrator}
					class="mt-1 text-xs block w-fit mx-auto px-1 rounded-full bg-zinc-100 text-zinc-950">{ClanMemberRole[member.role]}</span>
				<span class="text-xs block text-center font-medium mt-1">{member.user.profile.displayName}</span>
			</div>
		{/each}
	</div>

	<div class="w-full p-5 bg-zinc-900 rounded-xl flex flex-col gap-4 h-72 overflow-y-auto">
		<div class="flex flex-col h-60 gap-4 overflow-auto scrollbar-none" bind:this={chatBox}>
			{#each messages.sort(m => Number(m.created)).reverse() as message}
				<div class="w-full block text-sm">
					<div class="flex items-center gap-2 w-full py-1">
						<img src="{message.clanMember.user.profile.profilePicture}" alt="pfp" class="w-6 h-6 rounded-full">
						<span class="block">{message.clanMember.user.profile.displayName}</span>
						<span
							class="block h-5 px-1 rounded-full bg-zinc-100 text-zinc-900 text-sm">{ClanMemberRole[message.clanMember.role]}</span>
					</div>
					<p class="ml-8">{message.message}</p>
				</div>
			{/each}
		</div>

		<div class="flex items-center text-zinc-100 mt-auto bg-zinc-950 px-3 py-2 rounded-xl gap-2">
			<input bind:value={newChatMessage} type="text" class="block w-full p-0 rounded-none border-none bg-transparent">
			<button onclick="{sendMessage}"
							class="hover:border-zinc-100 border-1 p-2 rounded-xl transition-colors">
				<SendIcon />
			</button>
		</div>
	</div>


{/if}