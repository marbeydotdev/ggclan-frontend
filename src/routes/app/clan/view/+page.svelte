<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ViewClanPage from '../../../../components/Clan/ViewClanPage.svelte';

	onMount(() => {
		const hasClanId = $page.url.searchParams.has('clanId');
		if (!hasClanId) {
			goto('/app');
		}
		let id = Number($page.url.searchParams.get('clanId'));
		if (isNaN(id)) {
			goto('/app');
		}
		clanId = id;
	});

	let clanId: number | null = null;

</script>

{#if clanId !== null}
	<ViewClanPage clanId="{clanId}" />
{/if}