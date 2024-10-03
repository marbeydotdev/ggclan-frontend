<script lang="ts">
	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';
	import type { Clan } from '$lib/api';
	import { fly } from 'svelte/transition';

	export let clan: Clan;

</script>

<a href="/app/clan/view/{clan.id}"
	 class="block w-full py-2 px-3 bg-white/5 rounded mb-2 last:mb-0 border border-white/10 hover:bg-white/10">
	<div class="flex items-center">
		<span class="text-zinc-300 block mr-auto text-lg font-medium">{clan.name}</span>
		<div>
			{#each clan.members.slice(0, 5) as member}
				<img alt="user" class="w-6 h-6 rounded-full" src="{member.user.profile.profilePicture}" />
			{/each}
		</div>
	</div>

</a>