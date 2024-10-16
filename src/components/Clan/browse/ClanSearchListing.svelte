<script lang="ts">
	import { type Clan, type ClanMember, getMembers, sendInvite } from '$lib/api';
	import ArrowIcon from 'virtual:icons/mdi/menu-right';
	import { ready } from '$lib/auth';

	let requestSent: boolean = false;
	export let ClanListing: Clan;

	let members: ClanMember[] = [];
	if ($ready) {
		getMembers(ClanListing.id).then(res => {
			members = res.data;
		});
	}
</script>

<div
	class="flex p-5 gap-3 mb-2 rounded-xl hover-effect">
	<img class="w-24 h-24 object-contain rounded-full p-2" src="/favicon.png" alt="pfp" />
	<div class="flex flex-col flex-grow">
		<span class="block font-semibold">{ClanListing.name}</span>
		<small class="block">{ClanListing.game}</small>
		<p class="block flex-grow">{ClanListing.description}</p>
		<div class="flex gap-2">
			{#each members as member}
				<img class="w-6 h-6 rounded-full" src="{member.user.profile.profilePicture}" alt="pfp" />
			{/each}
		</div>
	</div>
	<div class="flex items-center">
		{#if !requestSent}
			<button class="button"
							on:click={() => {sendInvite(ClanListing.id).then(() => requestSent = true)}}>Join
			</button>
		{:else}
			<button disabled class="button">Request sent</button>
		{/if}

	</div>

</div>