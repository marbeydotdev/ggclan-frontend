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
<div class="flex items-center gap-2">
	<span class="page-header flex-grow">Join a clan</span>
	<a class="button w-12 h-12 mb-2" href="/app/clans">{'<'}</a>
</div>

<SearchBar OnSearch="{updateSearch}" />

{#each clans as clan}
	<ClanSearchListing ClanListing="{clan}" />
{/each}

<span class="block mb-4"></span>

{#if loading}
	<span class="block animate-pulse text-sm text-zinc-300">Loading...</span>
{/if}

{#if !loading && clans.length === 0}
	<span class="block text-sm text-zinc-300">no clans have been created yet. be the first!</span>
{/if}