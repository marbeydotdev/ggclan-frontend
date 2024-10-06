<script lang="ts">
	import '$lib/style.css';
	import Navigation from '../components/Navigation/Navigation.svelte';
	import { get } from 'svelte/store';
	import { ready, token } from '$lib/auth';
	import ButtonNavigation from '../components/Navigation/ButtonNavigation.svelte';
</script>

{#if get(ready)}
	<div class="sticky -top-9 backdrop-blur-xl bg-zinc-950/70 z-50 rounded-xl">
		<div
			class="block w-full md:w-3/4 xl:w-2/4 px-8 pt-16 pb-4 mx-auto ">
			<Navigation />
			{#if $token !== null}
				<ButtonNavigation />
			{/if}
		</div>
	</div>

	<div class="block relative w-full md:w-3/4 xl:w-2/4 px-8 py-6 mx-auto mb-20">
		<slot></slot>
	</div>
{/if}
