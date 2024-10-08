<script lang="ts">
	import type { Clan } from '$lib/api';
	import LockIcon from 'virtual:icons/mdi/lock';

	export let Clan: Clan;
</script>    <span class="text-xl flex gap-2">
			{Clan.name}
	{#if Clan.private}
				<LockIcon />
			{/if}
		</span>
<small class="block mb-3">{Clan.game}</small>
<p class="block text-sm mb-3">
	{Clan.description}
</p>