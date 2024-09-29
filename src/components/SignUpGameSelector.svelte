<script lang="ts">

	import TextIconSelectList from './TextIconSelectList.svelte';
	import { gameSearch } from '$lib/api';

	let search = '';

	let searchResultItems = [];

	let searchDebounce: number | undefined;

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

		let result = await gameSearch(search);
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
	<input on:keydown={onSearchChange} bind:value={search} type="text" placeholder="Search..."
				 class="w-full" class:rounded-b-none={searchResultItems.length !== 0}>
	<TextIconSelectList items={searchResultItems} multipleChoice={true} />
</div>