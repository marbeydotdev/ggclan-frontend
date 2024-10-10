<script lang="ts">
	import Logo from '../Logo.svelte';
	import { login, token } from '$lib/auth.js';
	import { browser } from '$app/environment';
	import ProfileMenu from './ProfileMenu.svelte';

	if (browser) {
		console.log(localStorage);
	}

	let auth: boolean;

	$: {
		if (browser) {
			auth = $token != null;
		}
	}

</script>

<div class="flex mb-5 flex-row gap-2 font-medium">
	<a href="{auth ? '/app' : '/'}">
		<Logo />
	</a>
	<span class="w-full"></span>
	{#if !auth}
		<button class="navb" on:click={() => {
	login();
}}>login
		</button>
	{:else}
		<ProfileMenu />
	{/if}

</div>

<style lang="postcss">
    .navb {
        @apply block w-fit px-3 py-2 rounded-full border hover:bg-zinc-100 hover:text-zinc-900
    }
</style>