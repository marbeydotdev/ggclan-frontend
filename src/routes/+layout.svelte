<script lang="ts">
	import '$lib/style.css';
	import Navigation from '../components/Navigation/Navigation.svelte';
	import { token } from '$lib/auth';
	import ButtonNavigation from '../components/Navigation/ButtonNavigation.svelte';
	import { browser } from '$app/environment';
</script>

{#if browser}
	<div
		class="sticky -top-9 backdrop-blur-xl bg-zinc-50/80 dark:bg-zinc-950/70 z-50 from-orange-950/40 to-transparent bg-gradient-to-b">
		<div
			class="block breakpoints pt-16 pb-4 mx-auto ">
			<Navigation />
			{#if $token !== null}
				<ButtonNavigation />
			{/if}
		</div>
	</div>

	<div class="block relative breakpoints py-4 mx-auto h-full">
		<slot></slot>
	</div>
{/if}
