<script>
	import EventListing from '../Event/EventListing.svelte';
	import SearchBar from '../SearchBar.svelte';
</script>

{#if false}
	<small class="text-zinc-400">There are no events planned yet.</small>
{/if}

<SearchBar />

<EventListing />
<EventListing />
<EventListing />
