<script lang="ts">
	import type { User } from '$lib/api';

	export let user: User;
</script>

<div
	class="flex p-5 cursor-pointer gap-3 mb-2 rounded-xl hover-effect">
	<img class="w-24 h-24 object-contain rounded-full p-2" src="{user.profile.profilePicture}" alt="pfp" />
	<div class="block">
		<span class="block font-semibold">{user.profile.displayName}</span>
		<small class="block">Joined on {new Intl.DateTimeFormat(navigator.language).format(new Date(user.created))}</small>
	</div>
</div>