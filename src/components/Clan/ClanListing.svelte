<script lang="ts">
	import type { Clan } from '$lib/api';
	import ArrowIcon from 'virtual:icons/mdi/menu-right';

	export let ClanListing: Clan;
</script>

<a href="/app/clan/view?clanId={ClanListing.id}"
	 class="flex sm:p-5 py-3 sm:gap-3 sm:mb-2 mb-5 rounded-xl hover-effect">
	<img class="w-24 h-24 object-contain rounded-full p-2" src="/favicon.png" alt="pfp" />
	<div class="flex flex-col flex-grow">
		<span class="block font-semibold">{ClanListing.name}</span>
		<small class="block">{ClanListing.game}</small>
		<p class="block flex-grow w-full h-12 overflow-ellipsis overflow-clip">{ClanListing.description}</p>
		<div class="flex gap-2">
			{#each ClanListing.members as member}
				<img class="w-6 h-6 rounded-full" src="{member.user.profile.profilePicture}" alt="pfp" />
			{/each}
		</div>
	</div>
	<div class="flex items-center">
		<ArrowIcon />
	</div>
</a>