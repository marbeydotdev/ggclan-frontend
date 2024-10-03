<script lang="ts">
	import Logo from '../Logo.svelte';
	import { login, logout, token } from '$lib/auth.js';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import ProfileMenu from './ProfileMenu.svelte';

	let auth: boolean;

	if (browser) {
		console.log(localStorage);
		auth = get(token) !== null;
	}
</script>

<div class="flex mb-5 flex-row gap-2 font-medium">
	<a href="{auth ? '/app' : '/'}">
		<Logo />
	</a>
	<span class="w-full"></span>
	{#if !auth}
		<button on:click={() => {
	login();
}}>login
		</button>
	{:else}
		<ProfileMenu />
	{/if}

</div>