<script lang="ts">
	import {user} from '$lib/auth';
	import { get } from 'svelte/store';
	import { authHeaders, ggApi } from '$lib/api';
	let userChange = get(user)

	async function update(){
		await ggApi.post("/user/update", userChange.profile, {headers: authHeaders()})
	}

</script>

{#if userChange !== undefined}
	<input type="text" bind:value={userChange.profile.displayName} on:change={update}>
	<input type="text" bind:value={userChange.profile.profilePicture} on:change={update}>
	<input type="text" bind:value={userChange.profile.bannerPicture} on:change={update}>
{/if}
