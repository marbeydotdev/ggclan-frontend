<script lang="ts">
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {
		type Clan,
		type ClanInvite,
		type ClanMember,
		ClanMemberRole,
		getClan,
		getInvites,
		getMembers
	} from '$lib/api';
	import { goto } from '$app/navigation';

	import BackIcon from 'virtual:icons/mdi/arrow-left';
	import PeopleIcon from 'virtual:icons/mdi/people';

	onMount(() => {
		clanId = Number($page.params.slug);
		getClan(clanId).then((cl) => {
			clan = (cl.data as Clan);
		}).catch(() => {
			goto('/app');
		});
		getMembers(clanId).then((getMembers) => {
			members = getMembers.data;
		});
		getInvites(clanId).then((getInvites) => {
			invites = getInvites.data;
		});
	});

	let clanId: number | null = null;

	let clan: Clan | null = null;
	let members: ClanMember[] = [];
	let invites: ClanInvite[] = [];

	let showInvites: boolean = false;

</script>

{#if clan !== null}
	<div class="flex items-center">
		<span class="page-header mr-auto">{clan.name}</span>
		<button
			onclick="{() => showInvites = !showInvites}"
			class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<span class="block relative">
				<PeopleIcon />
				<span
					class:!flex={invites.length > 0}
					class="text-xs  justify-center items-center rounded-full bg-red-500 w-4 h-4 absolute top-3 left-2 hidden">{invites.length}</span>
			</span>
		</button>
		<a href="/app/clans"
			 class="w-12 h-12 flex items-center justify-center hover:bg-zinc-100 transition-colors rounded-full">
			<BackIcon />
		</a>
	</div>

	{#if showInvites}
		<div in:fly={{y: 10}} class="flex gap-2 w-full h-32 mb-5 overflow-clip">
			{#each members as member}
				<div class="bg-zinc-900 h-full aspect-square p-3 rounded-xl hover-effect cursor-pointer">
					<img src="{member.user.profile.profilePicture}" class="h-14 w-14 bg-zinc-800 p-1 block mx-auto rounded-full"
							 alt="pfp">
					<span
						class:bg-yellow-500={member.role === ClanMemberRole.Owner}
						class:bg-orange-500={member.role === ClanMemberRole.Administrator}
						class="mt-1 text-xs block w-fit mx-auto px-1 rounded-full bg-zinc-100 text-zinc-950">{ClanMemberRole[member.role]}</span>
					<span class="text-xs block text-center font-medium mt-1">{member.user.profile.displayName}</span>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex gap-2 w-full h-32 mb-5 overflow-clip">
		{#each members as member}
			<div class="bg-zinc-900 h-full aspect-square p-3 rounded-xl hover-effect cursor-pointer">
				<img src="{member.user.profile.profilePicture}" class="h-14 w-14 bg-zinc-800 p-1 block mx-auto rounded-full"
						 alt="pfp">
				<span
					class:bg-yellow-500={member.role === ClanMemberRole.Owner}
					class:bg-orange-500={member.role === ClanMemberRole.Administrator}
					class="mt-1 text-xs block w-fit mx-auto px-1 rounded-full bg-zinc-100 text-zinc-950">{ClanMemberRole[member.role]}</span>
				<span class="text-xs block text-center font-medium mt-1">{member.user.profile.displayName}</span>
			</div>
		{/each}
	</div>
{/if}