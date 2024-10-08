<script lang="ts">
	import ClanList from '../Clan/ClanList.svelte';
	import SearchBar from '../SearchBar.svelte';
</script>

<SearchBar />
<ClanList />

<a class="button w-fit mb-2 !inline-block" href="/app/clan/create">Create</a>
<a class="button w-fit mb-2 !inline-block" href="/app/clan/browse">Browse</a>
