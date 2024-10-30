<script lang="ts">
	import ClanList from '../../../components/Clan/ClanList.svelte';
	import SearchBar from '../../../components/SearchBar.svelte';

</script>

<div class="flex items-center gap-2">
	<span class="page-header flex-grow">My clans</span>
	<a href="/app/clan/browse" class="button w-12 h-12 mb-2">j</a>
	<a class="button w-12 h-12 mb-2" href="/app/clan/create">+</a>
</div>

<SearchBar compact="{true}" />

<div class="block mb-2"></div>
<ClanList />
