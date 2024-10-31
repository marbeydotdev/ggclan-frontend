<script lang="ts">
	import SearchIcon from 'virtual:icons/mdi/search';

	let currentSearch: string = '';
	export let compact: boolean = false;
	export let OnSearch: (s: string) => void = () => {
	};
	export let OnInputChange: (s: string) => void = () => {
	};

	$: {
		OnInputChange(currentSearch);
	}

	function inputHandler(event: KeyboardEvent) {
		if (event.code === 'Enter') {
			OnSearch(currentSearch);
		}
	}

	function buttonClickHandler() {
		OnSearch(currentSearch);
	}
</script>

<div class="flex mb-2 dark:bg-transparent rounded-xl text-sm">
	<input class="w-full !border-0 rounded-r-none mr-0 px-0" type="text" placeholder="Search..."
				 class:!bg-transparent={compact}

				 bind:value={currentSearch}
				 on:keydown={inputHandler} />
	{#if !compact}
		<button on:click={buttonClickHandler}
						class:!border-l-0={compact}
						class:!bg-transparent={compact}
						class="px-3 flex items-center text-2xl dark:bg-zinc-800 rounded-r-xl">
			<SearchIcon />
		</button>
	{/if}

</div>