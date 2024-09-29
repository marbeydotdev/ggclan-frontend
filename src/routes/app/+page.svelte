<script lang="ts">
	import ClanTab from '../../components/Tabs/ClanTab.svelte';
	import FriendTab from '../../components/Tabs/FriendTab.svelte';
	import EventTab from '../../components/Tabs/EventTab.svelte';
	import AchievementTab from '../../components/Tabs/AchievementTab.svelte';

	let currentTab = 'Clans';

	const tabs = [
		'Clans',
		'Friends',
		'Events',
		'Achievements'
	];

</script>

<div class="buttons">
	{#each tabs as tab}
		<button class:active={currentTab === tab} on:click={() => {currentTab = tab}}>{tab}</button>
	{/each}
</div>

{#if currentTab === 'Clans'}
	<ClanTab />
{:else if currentTab === 'Friends'}
	<FriendTab />
{:else if currentTab === 'Events'}
	<EventTab />
{:else if currentTab === 'Achievements'}
	<AchievementTab />
{/if}


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