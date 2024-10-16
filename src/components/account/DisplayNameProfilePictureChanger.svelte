<script lang="ts">
	import { updateMe, type User } from '$lib/api';
	import { browser } from '$app/environment';
	import { user } from '$lib/auth';

	let _user: User | null;

	if (browser) {
		user.subscribe((u) => {
			_user = u;
		});
	}

	async function update(elem: Event) {
		if (_user === null) {
			return;
		}
		const t = elem.target as HTMLInputElement;
		t.disabled = true;
		await updateMe(_user.profile);
		t.disabled = false;

	}

</script>

{#if browser && typeof _user?.profile !== 'undefined'}
	<div class="relative flex items-center p-3 bg-zinc-900 rounded-full border border-white/10 overflow-clip">
		<img src="{_user.profile.profilePicture}" alt="profile" class="block w-20 h-20 rounded-full bg-zinc-200 p-3">
		<img src="{_user.profile.profilePicture}" alt="pfpblur"
				 class="absolute inset-0 w-full h-full blur-3xl pointer-events-none opacity-30">
		<span class="ml-10">@</span>
		<input class="username-change" type="text"
					 bind:value={_user.profile.displayName}
					 on:change={update}
					 class:animation-pulse={true}
		>
		<span class="text-xs text-zinc-400 mr-6">
			click to change
		</span>
	</div>
{/if}

<style lang="postcss">
    .username-change {
        @apply h-12 text-xl border-none bg-transparent font-normal font-mono mr-auto disabled:animate-pulse
    }
</style>