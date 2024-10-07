<script lang="ts">
	import SearchIcon from 'virtual:icons/mdi/search';

	let currentSearch: string = '';
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

<div class="flex mb-2">
	<input class="w-full border-0 rounded-r-none mr-0" type="text" placeholder="Search..." bind:value={currentSearch}
				 on:keydown={inputHandler} />
	<button on:click={buttonClickHandler}
					class="px-3 flex items-center text-2xl bg-zinc-800 rounded-r-xl border border-white/10">
		<SearchIcon />
	</button>
</div>