<script lang="ts">
	import { ready, token } from '$lib/auth';
	import { goto } from '$app/navigation';

	ready.subscribe((v) => {
		if (v && $token != null) {
			goto('/app/clans');
		}
	});
</script>

<svelte:head>
	<title>Get Started - GGclan</title>
	<meta name="description" content="GGclan -- where communities thrive." />
	<meta name="theme-color" content="rgb()" />
</svelte:head>

<div class="block">
	{#if $ready}
		{#if $token == null}
			<span class="page-header block">Welcome to GGClan.</span>
			<span>Please login or create an account.</span>
		{/if}
	{/if}
</div>