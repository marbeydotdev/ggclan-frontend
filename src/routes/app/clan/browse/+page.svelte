<script lang="ts">

	import SearchBar from '../../../../components/SearchBar.svelte';
	import { type Clan, getClans } from '$lib/api';
	import ClanSearchListing from '../../../../components/Clan/browse/ClanSearchListing.svelte';
	import { ready } from '$lib/auth';
	import BackButton from '../../../../components/Navigation/BackButton.svelte';

	let clans: Clan[] = [];

	let searchPage: number = 0;

	let loading: boolean = false;

	function updateSearch(query: string): void {
		loading = true;
		getClans(searchPage, query).then(res => {
			clans = res.data;
			loading = false;
		});
	}

	if ($ready) {
		updateSearch('');
	}

</script>
<BackButton />
<span class="page-header mt-3">Clan browser</span>

<SearchBar OnSearch="{updateSearch}" />

{#each clans as clan}
	<ClanSearchListing ClanListing="{clan}" />
{/each}

{#if clans.length === 0 && !loading}
	<span class="block animate-pulse text-sm text-zinc-300">Loading...</span>
{/if}