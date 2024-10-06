<script>
	import FriendListing from '../Friends/FriendListing.svelte';
	import SearchBar from '../SearchBar.svelte';
</script>

<small class="text-zinc-400 hidden">You have not added any friends yet.</small>

<SearchBar />

{#each [1, 2, 3, 4, 5] as n, index}
	<div class="block">
		<FriendListing />
	</div>
{/each}
