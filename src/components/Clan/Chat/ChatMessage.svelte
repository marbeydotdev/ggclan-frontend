<script lang="ts">
	import { type ClanChatMessage, ClanMemberRole } from '$lib/api';

	export let ChatMessage: ClanChatMessage;
</script>

<div class="block w-full py-3 px-2 hover:bg-zinc-900 cursor-pointer group border-b border-zinc-900">
	<div class="flex items-center">
		<span class="block text-sm ml-10 text-zinc-300 mr-2">{ChatMessage.clanMember.user.profile.displayName}</span>
		<span
			class:text-orange-400={ChatMessage.clanMember.role === 1}
			class:text-yellow-400={ChatMessage.clanMember.role === 2}
			class="text-sm mr-auto">{ClanMemberRole[ChatMessage.clanMember.role]}</span>
		<small class="text-transparent group-hover:text-zinc-300">{new Intl.DateTimeFormat(navigator.language, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
		}).format(new Date(ChatMessage.created))}</small>
	</div>
	<div class="flex gap-4 items-center">
		<img class="w-6 h-6 bg-zinc-900 rounded-full" alt="pfp" src="{ChatMessage.clanMember.user.profile.profilePicture}">
		<p class="text-sm overflow-ellipsis break-words flex-grow overflow-clip">{ChatMessage.message}</p>
	</div>
</div>