<script lang="ts">
	import { ready, token } from '$lib/auth';
</script>

<svelte:head>
	<title>Get Started - GGclan</title>
	<meta name="description" content="GGclan -- where communities thrive." />
	<meta name="theme-color" content="rgb()" />
</svelte:head>

<div class="block">
	<span class="page-header block">Welcome to GGClan.</span>
	{#if $ready}
		{#if $token != null}
			<a href="/app" class="button w-fit">Open app</a>
		{:else}
			<span>Please login or create an account.</span>
		{/if}
	{/if}
</div>