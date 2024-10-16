<script lang="ts">
	import {
		acceptInvite,

		type ClanInvite,
		type ClanMember,
		ClanMemberRole,
		denyInvite,
		getInvites, getMembers
	} from '$lib/api';
	import { ready } from '$lib/auth';
	import { toast, toastType } from '$lib/toasts';
	import { onDestroy } from 'svelte';

	let timeout;
	export let ClanId: number;

	let joinRequests: ClanInvite[] | null = null;

	let members: ClanMember[] = [];

	function refreshData() {
		getInvites(ClanId).then((invites) => {
			joinRequests = invites.data;
		});
		getMembers(ClanId).then(res => {
			members = res.data;
		});
	}

	if ($ready) {
		refreshData();
		timeout = setInterval(() => {
			refreshData();
		}, 3000);
	}

	function accept(inviteId: number) {
		acceptInvite(inviteId).then((invite) => {
			toast('User has joined your clan.', toastType.Success);
			refreshData();
		});
	}

	function deny(inviteId: number) {
		denyInvite(inviteId).then((invite) => {
			toast('Invite request has been denied.', toastType.Success);
			refreshData();
		});
	}


	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<span class="page-header">Members</span>

{#each members as member}
	<div
		class="flex p-5 cursor-pointer gap-3 mb-2 rounded-xl hover-effect">
		<img class="w-16 h-16 object-contain rounded-full p-2" src="{member.user.profile.profilePicture}" alt="pfp" />
		<div class="block">
			<span class="block font-semibold">{member.user.profile.displayName}</span>
			<small class="block">Joined {new Intl.DateTimeFormat(navigator.language, {
				dateStyle: "medium",
				timeStyle: "medium"
			}).format(new Date(member.created))}</small>
			<span
				class:text-orange-400={member.role === 1}
				class:text-yellow-400={member.role === 2}
				class="text-sm mr-2">{ClanMemberRole[member.role]}</span>
		</div>
	</div>
{/each}

<span class="block my-3 text-xl font-semibold">Pending invites</span>

{#each joinRequests ?? [] as joinRequest}
	<div
		class="flex p-5 cursor-pointer gap-3 mb-2 rounded-xl hover-effect">
		<img class="w-16 h-16 object-contain rounded-full p-2" src="{joinRequest.user.profile.profilePicture}" alt="pfp" />
		<div class="block mr-auto">
			<span class="block font-semibold">{joinRequest.user.profile.displayName}</span>
			<small class="block">Account created {new Intl.DateTimeFormat(navigator.language, {
				dateStyle: "medium",
				timeStyle: "medium"
			}).format(new Date(joinRequest.user.created))}</small>
		</div>
		<button class="button" on:click={() => {accept(joinRequest.id)}}>Accept</button>
		<button class="button" on:click={() => {deny(joinRequest.id)}}>Deny</button>
	</div>
{/each}
{#if joinRequests !== null && joinRequests.length === 0}
	<small class="text-zinc-400">There are no join requests at this time.</small>
{/if}