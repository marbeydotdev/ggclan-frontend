<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		type Clan, type ClanInvite, type ClanMember,
		getClan

	} from '$lib/api';
	import { goto } from '$app/navigation';

	import BackIcon from 'virtual:icons/mdi/arrow-left';
	import PeopleIcon from 'virtual:icons/mdi/people';

	import ChatBox from '../../../../components/Clan/ChatBox.svelte';
	import MemberBox from '../../../../components/Clan/MemberBox.svelte';

	onMount(() => {
		clanId = Number($page.params.slug);
		getClan(clanId).then((cl) => {
			clan = (cl.data as Clan);
		}).catch(() => {
			goto('/app');
		});
	});

	let clanId: number;

	let clan: Clan | null = null;

	let showMembers: boolean = false;

	let invites: ClanInvite[];
	let members: ClanMember[];
</script>

{#if clan !== null}
	<div class="flex items-center">
		<span class="page-header mr-auto">{clan.name}</span>
		<button
			onclick="{() => showMembers = !showMembers}"
			class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<span class="block relative">
				<PeopleIcon />
				<span
					class:!flex={invites.length > 0}
					class="text-xs text-zinc-100 dark:text-zinc-950 justify-center items-center rounded-full bg-red-500 w-4 h-4 absolute top-3 left-2 hidden">{invites.length}</span>
			</span>
		</button>
		<a href="/app/clans"
			 class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<BackIcon />
		</a>
	</div>

	<div class:hidden={!showMembers}>
		<MemberBox bind:invites={invites} bind:members={members} clanId="{clanId}" />
	</div>

	<ChatBox clanId="{clanId}" />


{/if}