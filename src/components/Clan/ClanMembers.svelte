<script lang="ts">
	import { type Clan, ClanMemberRole, getClan } from '$lib/api';
	import { ready } from '$lib/auth';

	export let ClanId: number;

	let clan: Clan;

	if ($ready) {
		getClan(ClanId).then(req => {
			clan = req.data;
		});
	}

</script>

{#each clan?.members ?? [] as member}
	<div
		class="flex p-5 hover:bg-gradient-to-bl hover:from-zinc-800 hover:to-zinc-900 cursor-pointer gap-3 mb-2 rounded-xl border border-transparent hover:border-zinc-600 transition-colors">
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