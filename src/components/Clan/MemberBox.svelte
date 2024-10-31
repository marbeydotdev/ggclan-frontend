<script lang="ts">
	import {
		acceptInvite,
		type ClanInvite,
		type ClanMember,
		ClanMemberRole,
		denyInvite,
		getInvites,
		getMembers
	} from '$lib/api';
	import { onDestroy, onMount } from 'svelte';
	import { user } from '$lib/auth';
	import { fade } from 'svelte/transition';
	import AddIcon from 'virtual:icons/mdi/check';
	import RemoveIcon from 'virtual:icons/mdi/close';

	export let clanId: number;

	export let members: ClanMember[] = [];
	export let invites: ClanInvite[] = [];
	let clanMember: ClanMember;
	let memberInterval: ReturnType<typeof setInterval>;


	function retrieveInvitesAndMembers() {
		if ([ClanMemberRole.Owner, ClanMemberRole.Administrator].includes(clanMember?.role)) {
			getInvites(clanId!).then((getInvites) => {
				invites = getInvites.data;
			});
		}
		getMembers(clanId!).then((getMembers) => {
			members = getMembers.data;
			clanMember = members.find(m => m.user.id === $user!.id)!;
		});
	}

	onMount(() => {
		retrieveInvitesAndMembers();
		memberInterval = setInterval(retrieveInvitesAndMembers, 5000);
	});

	onDestroy(() => {
		clearInterval(memberInterval);
	});

</script>
<div class="flex gap-2 w-full h-32 mb-5 overflow-clip">
	{#each members as member}
		<div class="dark:bg-zinc-900 h-full aspect-square p-3 rounded-xl hover-effect cursor-pointer">
			<img src="{member.user.profile.profilePicture}"
					 class="h-14 w-14 dark:bg-zinc-800 p-1 block mx-auto rounded-full"
					 alt="pfp">
			<span
				class:!bg-yellow-500={member.role === ClanMemberRole.Owner}
				class:!bg-orange-500={member.role === ClanMemberRole.Administrator}
				class="mt-1 text-xs block w-fit mx-auto px-1 rounded-full bg-zinc-100 text-zinc-950">{ClanMemberRole[member.role]}</span>
			<span class="text-xs block text-center font-medium mt-1">{member.user.profile.displayName}</span>
		</div>
	{/each}
</div>
{#if [ClanMemberRole.Owner, ClanMemberRole.Administrator].includes(clanMember?.role)}
	<div in:fade
			 class="flex gap-2 w-full h-32 mb-5 overflow-clip items-center border-y py-3 dark:border-zinc-800 border-zinc-200">
		{#if invites.length === 0}
			<small class="block w-full text-zinc-500 text-center">No invites yet.</small>
		{/if}
		{#each invites as invite}
			<div class="w-56 dark:bg-zinc-900 bg-zinc-100 gap-5 h-full p-3 rounded-xl flex-row flex">
				<div class="block">
					<img src="{invite.user.profile.profilePicture}"
							 class="h-14 w-14 bg-zinc-800 p-1 block mx-auto rounded-full"
							 alt="pfp">
					<span class="text-xs block text-center font-medium mt-1">{invite.user.profile.displayName}</span>
				</div>
				<div class="flex flex-col flex-grow">
					<span class="block text-sm font-medium">{invite.user.profile.displayName}</span>
					<p class="text-sm text-zinc-300 block flex-grow">{invite.message ?? ''}</p>
					<div class="flex gap-6">
						<button
							onclick="{() => {acceptInvite(invite.id).then(() => retrieveInvitesAndMembers())}}"
							class="flex w-8 h-8 rounded-full justify-center items-center transition-colors hover:bg-green-500 cursor-pointer">
							<AddIcon />
						</button>
						<button
							onclick="{() => {denyInvite(invite.id).then(() => retrieveInvitesAndMembers())}}"
							class="flex w-8 h-8 rounded-full justify-center items-center transition-colors hover:bg-red-500 cursor-pointer">
							<RemoveIcon />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}