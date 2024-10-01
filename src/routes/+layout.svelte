<script lang="ts">
	import '$lib/style.css';
	import Navigation from '../components/Navigation.svelte';
	import { get } from 'svelte/store';
	import { ready } from '$lib/auth';
	import ButtonNavigation from '../components/ButtonNavigation.svelte';
</script>

{#if get(ready)}
	<div class="block relative w-full md:w-3/4 xl:w-2/4 px-8 py-16 mx-auto h-full">
		<Navigation />
		<ButtonNavigation />
		<slot></slot>
	</div>
{/if}
