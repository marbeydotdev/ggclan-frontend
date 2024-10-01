<script lang="ts">
	import ClanTab from '../../components/Tabs/ClanTab.svelte';
	import FriendTab from '../../components/Tabs/FriendTab.svelte';
	import EventTab from '../../components/Tabs/EventTab.svelte';
	import AchievementTab from '../../components/Tabs/AchievementTab.svelte';
	import { NavigationPage } from '$lib/stores';


</script>


{#if $NavigationPage === 'Clans'}
	<ClanTab />
{:else if $NavigationPage === 'Friends'}
	<FriendTab />
{:else if $NavigationPage === 'Events'}
	<EventTab />
{:else if $NavigationPage === 'Achievements'}
	<AchievementTab />
{/if}


