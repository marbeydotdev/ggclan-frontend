<script lang="ts">
	import ClanList from '../../../components/Clan/ClanList.svelte';
	import SearchBar from '../../../components/SearchBar.svelte';
	import SearchIcon from 'virtual:icons/mdi/earth';
	import AddIcon from 'virtual:icons/mdi/add';
</script>

<div class="flex items-center gap-2">
	<span class="page-header flex-grow">My clans</span>
	<a href="/app/clans/browse" class="button w-12 h-12 mb-2">
		<SearchIcon />
	</a>
	<a class="button w-12 h-12 mb-2" href="/app/clans/create">
		<AddIcon />
	</a>
</div>

<SearchBar compact="{true}" />

<div class="block mb-2"></div>
<ClanList />
