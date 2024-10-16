<script lang="ts">
	import ClanList from '../../../components/Clan/ClanList.svelte';
	import SearchBar from '../../../components/SearchBar.svelte';

	let search: boolean = false;
</script>

<span class="page-header">My clans</span>
<a class="button w-fit mb-2 !inline-block" href="/app/clan/browse">Join</a>
<a class="button w-fit mb-2 !inline-block" href="/app/clan/create">Create</a>
<button class="button w-fit mb-2 !inline-block" on:click={() => search = !search}>Search</button>

{#if search}
	<SearchBar />
	<span class="block mb-5"></span>
{/if}
<div class="block mb-2"></div>
<ClanList />
