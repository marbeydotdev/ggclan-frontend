<script>
	import SearchBar from '../SearchBar.svelte';
	import AchievementListing from '../Achievement/AchievementListing.svelte';
</script>

<small class="text-zinc-400 hidden">You don't have any achievements yet.</small>

<SearchBar />

<div class="flex flex-wrap gap-2">
	<AchievementListing />
	<AchievementListing />
	<AchievementListing />
	<AchievementListing />
	<AchievementListing />
</div>