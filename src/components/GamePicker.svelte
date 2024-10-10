<script lang="ts">

	import TextIconSelectList from './TextIconSelectList.svelte';
	import { gameSearch } from '$lib/api';

	let search = '';

	let searchResultItems: { name: string; icon: string; value: string }[] = [];

	export let multiple: boolean = true;

	let searchDebounce: any;

	let searching: boolean = false;

	export let selected: { name: string; icon: string; value: string }[];

	function onSearchChange() {
		clearTimeout(searchDebounce);
		searchDebounce = setTimeout(() => {
			updateGameSearch();
		}, 700);
	}

	async function updateGameSearch() {
		if (search === '') {
			searchResultItems = [];
			return;
		}

		searching = true;

		let result = await gameSearch(search);

		searching = false;

		searchResultItems = result.map((item) => {
			return {
				name: item.name,
				icon: item.iconUrl,
				value: item.gameId
			};
		});
	}
</script>

<div>
	{#if !searching}
		<input on:keydown={onSearchChange} bind:value={search} type="text" placeholder="Search a game..."
					 class="w-full mt-2" class:rounded-b-none={searchResultItems.length !== 0}>
	{:else}
		<input bind:value={search} type="text" placeholder="Search a game..."
					 class="w-full mt-2 animate-pulse" disabled class:rounded-b-none={searchResultItems.length !== 0}>
	{/if}

	<TextIconSelectList bind:selected={selected} items={searchResultItems} multipleChoice={multiple} />
</div>