<script lang="ts">
	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';
	import { type Clan, getMyClans } from '$lib/api';
	import { ready } from '$lib/auth';
	import ClanListing from './ClanListing.svelte';

	let myClans: Array<Clan> = [];

	if ($ready) {
		getMyClans().then((clans) => myClans = clans);
	}

</script>
{#if myClans.length === 0}
	<small class="text-zinc-400">You are not part of any clans yet.</small>
{/if}
{#each myClans as clan}
	<ClanListing ClanListing="{clan}" />
{/each}