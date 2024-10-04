<script lang="ts">
	import type { ClanChatMessage } from '$lib/api';

	export let ChatMessage: ClanChatMessage;
</script>

<div class="block w-full mb-4">
	<div class="block text-sm mb-2">{ChatMessage.clanMember.user.profile.displayName}</div>
	<div class="flex gap-4">
		<img class="w-6 h-6 rounded-full" alt="pfp" src="{ChatMessage.clanMember.user.profile.profilePicture}">
		<p class="text-sm">{ChatMessage.message}</p>
	</div>
</div>