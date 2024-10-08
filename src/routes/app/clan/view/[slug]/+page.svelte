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
	import ClanMembers from '../../../../../components/Clan/ClanMembers.svelte';
	import ClanHome from '../../../../../components/Clan/ClanHome.svelte';

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
				d
			{/if}
		</div>
	</div>

{:else}
	<small class="animate-pulse">loading...</small>
{/if}