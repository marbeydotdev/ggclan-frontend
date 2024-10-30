<script lang="ts">
	import type { User } from '$lib/api.js';
	import { updateMe } from '$lib/api.js';
	import { browser } from '$app/environment';
	import { user } from '$lib/auth.js';
	import { toast, toastType } from '$lib/toasts';
	import PencilIcon from 'virtual:icons/mdi/pencil';

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

<div class="row !border-b border-zinc-800">
	<span class="mb-2 pb-3 text-lg">display name</span>
	{#if _user !== null}
		<div class="w-full flex gap-3">
			<input onchange="{update}" type="text" class="text-sm flex-grow"
						 bind:value={_user.profile.displayName}>
			<PencilIcon />
		</div>

	{/if}
</div>

<div class="row !border-b border-zinc-800">
	<span class="mb-2 pb-3 text-lg">profile picture</span>
	{#if _user !== null}
		<div class="w-full flex gap-3">
			<input onchange="{update}" type="text" class="text-sm flex-grow"
						 bind:value={_user.profile.profilePicture}>
			<PencilIcon />
		</div>

	{/if}
</div>

<style lang="postcss">
    input {
        @apply bg-transparent rounded border-0 p-0
    }

    .row {
        @apply flex justify-between flex-col sm:flex-row sm:items-center py-5 border-0 border-zinc-900 last-of-type:border-b-0
    }

    .row > * {
        @apply basis-1/2
    }
</style>