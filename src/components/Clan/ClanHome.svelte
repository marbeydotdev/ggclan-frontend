<script lang="ts">
	import type { Clan } from '$lib/api';
	import LockIcon from 'virtual:icons/mdi/lock';

	export let Clan: Clan;
</script>

<span class="page-header">{Clan.name}</span>

<div class="flex items-center flex-wrap gap-2">
	<small class="pill">{Clan.game}</small>
	<small
		class="pill">{Clan.private ? "Private" : "Public"}</small>
</div>


<p class="block text-sm mb-3">
	{Clan.description}
</p>

<style lang="postcss">
    .pill {
        @apply block mb-3 px-2 py-1 dark:bg-zinc-200 border dark:border-transparent border-zinc-600 text-zinc-900 rounded-full
    }
</style>