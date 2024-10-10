<script lang="ts">
	import FriendListing from '../Friends/FriendListing.svelte';
	import SearchBar from '../SearchBar.svelte';
	import { onMount } from 'svelte';
	import { getFriends, type User } from '$lib/api';

	let friends: User[] | null = null;

	onMount(() => {
		getFriends().then((friendGet) => {
			friends = friendGet;
		});
	});

</script>

<span class="page-header">Friends</span>

<small class:hidden={friends != null && friends.length > 0} class="text-zinc-500 block mb-2">You have not added any
	friends
	yet. Join a clan to make friends!</small>

<SearchBar />

{#each friends ?? [] as friend}
	<div class="block">
		<FriendListing user="{friend}" />
	</div>
{/each}
