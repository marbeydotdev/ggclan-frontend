<script lang="ts">
	import { page } from '$app/stores';
	import { ready } from '$lib/auth';
	import { type Clan, getClan } from '$lib/api';
	import { toast, toastType } from '$lib/toasts';
	import { goto } from '$app/navigation';
	import LockIcon from 'virtual:icons/mdi/lock';

	let clan: Clan | null = null;

	if ($ready) {
		let id = Number($page.params.slug);
		if (isNaN(id)) {
			toast('Bad clan ID', toastType.Warning);
			goto('/app');
		}
		getClan(id).then((cl) => {
			clan = (cl.data as Clan);
		});
	}


</script>

{#if clan !== null}
	<div class="block">
		<span class="text-xl block mb-3">
			{clan.name}
			{#if clan.private}
				<LockIcon />
			{/if}
		</span>
		<p class="block text-sm mb-3">
			{clan.description}
		</p>
	</div>
{:else}
	<small class="animate-pulse">loading...</small>
{/if}