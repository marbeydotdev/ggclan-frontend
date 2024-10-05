<script>
	import FriendListing from '../Friends/FriendListing.svelte';
	import SearchIcon from 'virtual:icons/mdi/search';
</script>

<small class="text-zinc-400 hidden">You have not added any friends yet.</small>

<div class="flex mb-2">
	<input class="w-full border-r-0 rounded-r-none mr-0" type="text" placeholder="Search..." />
	<button class="px-3 flex items-center text-2xl bg-zinc-800 rounded-r-xl border border-white/10">
		<SearchIcon />
	</button>
</div>

<FriendListing />
<FriendListing />
<FriendListing />
<FriendListing />
