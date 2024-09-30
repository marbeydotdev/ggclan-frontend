<script lang="ts">
	import { type Clan, getMyClans } from '$lib/api';
	import { ready } from '$lib/auth';
	import CreateClan from '../CreateClan.svelte';

	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';

	let myClans: Array<Clan> = [];

	if ($ready) {
		getMyClans().then((clans) => myClans = clans);
	}

</script>

{#if $ready}
	{#if myClans.length === 0}
		<small class="text-zinc-400">You are not part of any clans yet.</small>
	{/if}
	{#each myClans as clan}
		<div class="block w-full p-3 bg-zinc-900 rounded mb-1 border border-white/5">
			<div class="flex items-center">
				<span class="text-zinc-300 block mr-auto">{clan.name}</span>
				<ArrowIcon />
			</div>
		</div>
	{/each}
	<CreateClan />
{/if}
