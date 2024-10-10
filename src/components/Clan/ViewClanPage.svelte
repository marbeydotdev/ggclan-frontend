<script lang="ts">
	import { ready } from '$lib/auth';
	import { type Clan, type ClanInvite, getClan, getInvites } from '$lib/api';
	import ClanViewSidebar from './ClanViewSidebar.svelte';
	import ClanHome from './ClanHome.svelte';
	import ClanChat from './Chat/ClanChat.svelte';
	import ClanMembers from './ClanMembers.svelte';
	import { goto } from '$app/navigation';

	export let clanId: number;

	let clan: Clan | null = null;

	enum Pages {
		Home,
		Chat,
		Members,
		Events
	}

	let CurrentPage: string = Pages[Pages.Home];

	if ($ready) {
		getClan(clanId).then((cl) => {
			clan = (cl.data as Clan);

		}).catch(() => {
			goto('/app');
		});
	}


</script>
{#if clan !== null}
	<div class="flex mb-3 gap-0">
		<ClanViewSidebar bind:CurrentTab="{CurrentPage}" />
		<div class="block w-full">
			{#if CurrentPage === Pages[Pages.Home]}
				<ClanHome Clan="{clan}" />
			{:else if CurrentPage === Pages[Pages.Chat]}
				<ClanChat ClanId="{clan.id}" />
			{:else if CurrentPage === Pages[Pages.Members]}
				<ClanMembers ClanId="{clan.id}" />
			{:else if CurrentPage === Pages[Pages.Events]}
				<small class="text-zinc-400">This feature is not yet implemented.</small>
			{/if}
		</div>
	</div>

{:else}
	<small class="animate-pulse">loading...</small>
{/if}