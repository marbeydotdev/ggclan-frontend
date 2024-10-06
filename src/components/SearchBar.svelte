<script lang="ts">
	import SearchIcon from 'virtual:icons/mdi/search';

	export let OnSearchHandler: (s: number) => void;

	function inputHandler(ev) {
		
	}
</script>

<div class="flex mb-2">
	<input class="w-full border-0 rounded-r-none mr-0" type="text" placeholder="Search..." />
	<button class="px-3 flex items-center text-2xl bg-zinc-800 rounded-r-xl border border-white/10">
		<SearchIcon />
	</button>
</div>