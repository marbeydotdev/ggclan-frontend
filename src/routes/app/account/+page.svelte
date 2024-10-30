<script lang="ts">
	import type { User } from '$lib/api.js';
	import { updateMe } from '$lib/api.js';
	import { browser } from '$app/environment';
	import { user } from '$lib/auth.js';
	import { toast, toastType } from '$lib/toasts';

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

	async function tryProfilePictureUpdate(elem: Event) {
		if (_user === null) {
			return;
		}
		if (!await checkUrlIsImage(_user.profile.profilePicture)) {
			toast('Enter a valid image URL.', toastType.Warning);
			return;
		}
		await update(elem);
	}

	async function checkUrlIsImage(image: string) {
		try {
			let req = await fetch(image, { method: 'HEAD', mode: 'cors' });
			let header = req.headers.get('content-type') ?? '';
			return header.startsWith('image/');
		} catch {
			toast('Profile picture origin should allow CORS. Try another image', toastType.Warning);
		}
	}

</script>

<span class="page-header">Account</span>

<div class="row">
	<span class="text-zinc-400 font-medium">display name</span>
	{#if _user !== null}
		<input type="text" onchange="{update}" bind:value={_user.profile.displayName}>
	{/if}
</div>

<div class="row">
	<span class="text-zinc-400 font-medium">profile picture</span>
	{#if _user !== null}
		<input onchange="{tryProfilePictureUpdate}" type="url" class="text-sm" bind:value={_user.profile.profilePicture}>
	{/if}
</div>

<div class="row">
	<br>
	{#if _user !== null}
		<img class="w-24 h-24 object-contain object-left" alt="profile" src={_user.profile.profilePicture}>
	{/if}
</div>

<style lang="postcss">
    input {
        @apply bg-transparent rounded border-0 p-0
    }

    .row {
        @apply flex justify-between items-center py-5 border-0 border-zinc-900 last-of-type:border-b-0
    }

    .row > * {
        @apply basis-1/2
    }
</style>