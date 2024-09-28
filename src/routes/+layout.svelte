<script lang="ts">
	import '$lib/style.css';
	import Navigation from '../components/Navigation.svelte';
	import { get } from 'svelte/store';
	import { ready } from '$lib/auth';
</script>

{#if get(ready)}
	<div class="block w-full md:w-3/4 xl:w-2/4 px-8 py-16 mx-auto">
		<Navigation />
		<slot></slot>
	</div>
{/if}
