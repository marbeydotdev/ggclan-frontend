<script lang="ts">
	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';
	import { type Clan, getMyClans } from '$lib/api';
	import { ready } from '$lib/auth';

	let myClans: Array<Clan> = [];

	if ($ready) {
		getMyClans().then((clans) => myClans = clans);
	}

</script>
{#if myClans.length === 0}
	<small class="text-zinc-400">You are not part of any clans yet.</small>
{/if}
{#each myClans as clan}
	<div class="flex items-center w-full ps-6 pe-3 py-3 bg-zinc-900 rounded-full mb-1 border border-white/10">
		<span class="text-zinc-300 block mr-auto">{clan.name}</span>
		<a
			class="flex items-center justify-center relative rounded-full w-9 h-9 hover:bg-zinc-800 text-xl z-10"
			href="/app/clan/view/{clan.id}"
		>
			<ArrowIcon />
		</a>
	</div>
{/each}