<script lang="ts">
	import { page } from '$app/stores';
	import { ready } from '$lib/auth';
	import { type Clan, getClan } from '$lib/api';
	import { toast, toastType } from '$lib/toasts';
	import { goto } from '$app/navigation';
	import LockIcon from 'virtual:icons/mdi/lock';
	import BackIcon from 'virtual:icons/mdi/arrow-back';
	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';
	import ClanViewSidebar from '../../../../../components/Clan/ClanViewSidebar.svelte';
	import ClanChat from '../../../../../components/Clan/Chat/ClanChat.svelte';

	let clan: Clan | null = null;

	enum Pages {
		Home,
		Chat,
		Members,
		Events
	}

	let CurrentPage: string = Pages[Pages.Home];

	if ($ready) {
		let id = Number($page.params.slug);
		if (isNaN(id)) {
			toast('Bad clan ID', toastType.Warning);
			goto('/app');
		}
		getClan(id).then((cl) => {
			clan = (cl.data as Clan);
		});
	}


</script>
<a class="flex items-center gap-2 text-xs text-zinc-200 mb-4 -mt-2" href="/app">
	<BackIcon />
	back</a>
{#if clan !== null}
	<div class="flex mb-3">
		<div class="block w-full">
			{#if CurrentPage === Pages[Pages.Home]}
		<span class="text-xl flex gap-2">
			{clan.name}
			{#if clan.private}
				<LockIcon />
			{/if}
		</span>
				<small class="block mb-3">{clan.game}</small>
				<p class="block text-sm mb-3">
					{clan.description}
				</p>
			{:else if CurrentPage === Pages[Pages.Chat]}
				<ClanChat ClanId="{clan.id}" />
			{/if}
		</div>
		<ClanViewSidebar bind:CurrentTab="{CurrentPage}" Clan="{clan}" />
	</div>

{:else}
	<small class="animate-pulse">loading...</small>
{/if}