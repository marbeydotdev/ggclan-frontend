<script lang="ts">

	import TextIconSelectList from './TextIconSelectList.svelte';
	import { gameSearch } from '$lib/api';

	let search = '';

	let searchResultItems: { name: string; icon: string; value: string }[] = [];

	export let multiple: boolean = true;

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
	<input on:keydown={onSearchChange} bind:value={search} type="text" placeholder="Search a game..."
				 class="w-full small" class:rounded-b-none={searchResultItems.length !== 0}>
	<TextIconSelectList items={searchResultItems} multipleChoice={multiple} />
</div>