<script lang="ts">

	import SearchBar from '../../../../components/SearchBar.svelte';
	import { type Clan, getClans } from '$lib/api';
	import ClanSearchListing from '../../../../components/Clan/ClanSearchListing.svelte';

	let clans: Clan[] = [];

	let searchPage: number = 0;

	function updateSearch(query: string): void {
		getClans(searchPage, query).then(res => {
			clans = res.data;
		});
	}

</script>

<SearchBar OnSearch="{updateSearch}" />

{#each clans as clan}
	<ClanSearchListing ClanListing="{clan}" />
{/each}