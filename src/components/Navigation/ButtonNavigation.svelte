<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const tabs = [
		['Clans', '/app/clans'],
		['Friends', '/app/friends'],
		['Events', '/app/events'],
		['Achievements', '/app/achievements']
	];

</script>

<div class="buttons">
	{#each tabs as tab}
		<button class:active={$page.url.pathname === tab[1]} on:click={() => {goto(tab[1])}}>{tab[0]}</button>
	{/each}
</div>

<style lang="postcss">
    .buttons {
        @apply flex flex-row gap-3 select-none overflow-x-auto
    }

    .buttons button {
        @apply inline-block px-3 py-1 rounded-full border border-transparent hover:border-zinc-200
    }

    .active {
        @apply bg-zinc-100 text-zinc-900
    }
</style>