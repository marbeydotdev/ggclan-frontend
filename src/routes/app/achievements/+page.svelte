<script lang="ts">
	import SearchBar from '../../../components/SearchBar.svelte';
	import AchievementListing from '../../../components/achievements/AchievementListing.svelte';
	import { type Achievement, getAchievements } from '$lib/api.js';
	import { ready } from '$lib/auth';

	let achievements: Achievement[] = [];
	let achievementList: Achievement[] = achievements;

	if ($ready) {
		getAchievements().then((ach => {
			achievements = ach.data;
			achievementList = ach.data;
		}));
	}

	function onSearchChange(search: string) {
		if (search === '') {
			achievementList = achievements;
			return;
		}

		achievementList = achievements.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
	}

</script>

<span class="page-header">Achievements</span>

<small class="text-zinc-400 hidden">You don't have any achievements yet.</small>

<SearchBar compact="{true}" OnInputChange="{onSearchChange}" />

<div class="flex flex-wrap gap-2 flex-col">
	{#each achievementList as achievement}
		<AchievementListing Achieved="{achievement}" />
	{/each}
</div>