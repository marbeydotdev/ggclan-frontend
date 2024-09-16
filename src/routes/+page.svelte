<script lang="ts">
	import Logo from '../components/Logo.svelte';
	import {fly} from 'svelte/transition';
	import SignUpGameSelector from '../components/SignUpGameSelector.svelte';
</script>

<svelte:head>
	<title>Get Started - GGclan</title>
	<meta name="description" content="GGclan -- where communities thrive." />
	<meta name="theme-color" content="rgb()" />
</svelte:head>

<div in:fly|global class="block w-full md:w-3/4 xl:w-2/4 px-8 py-16 mx-auto">
	<div class="block mb-5">
		<Logo />
	</div>
	<SignUpGameSelector />
</div>