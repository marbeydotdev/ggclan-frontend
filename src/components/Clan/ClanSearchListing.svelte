<script lang="ts">
	import { type Clan, sendInvite } from '$lib/api';
	import ArrowIcon from 'virtual:icons/mdi/menu-right';

	export let ClanListing: Clan;
</script>

<div
	class="flex p-5 gap-3 mb-2 rounded-xl hover-effect">
	<img class="w-24 h-24 object-contain rounded-full p-2" src="/favicon.png" alt="pfp" />
	<div class="flex flex-col flex-grow">
		<span class="block font-semibold">{ClanListing.name}</span>
		<small class="block">{ClanListing.game}</small>
		<p class="block flex-grow">{ClanListing.description}</p>
		<div class="flex gap-2">
			{#each ClanListing.members as member}
				<img class="w-6 h-6 rounded-full" src="{member.user.profile.profilePicture}" alt="pfp" />
			{/each}
		</div>
	</div>
	<div class="flex items-center">
		<ArrowIcon />
	</div>
	<button class="button" on:click={() => {sendInvite(ClanListing.id)}}>Send join request</button>
</div>