<script lang="ts">
	import { NavigationPage } from '$lib/stores';
	import { goto } from '$app/navigation';

	const tabs = [
		'Clans',
		'Friends',
		'Events',
		'Achievements'
	];
</script>

<div class="buttons">
	{#each tabs as tab}
		<button class:active={$NavigationPage === tab} on:click={() => {$NavigationPage = tab; goto('/app')}}>{tab}</button>
	{/each}
</div>

<style lang="postcss">
    .buttons {
        @apply flex flex-row gap-3 mb-5 select-none
    }

    .buttons button {
        @apply inline-block px-3 py-1 rounded-full border border-transparent hover:border-zinc-200
    }

    .active {
        @apply bg-zinc-100 text-zinc-900
    }
</style>