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

{#if browser && _user !== null && typeof _user?.profile !== 'undefined'}
	<div class="mb-10">
		<div class="flex items-center flex-row gap-1">
			<img class="block relative object-contain w-20 h-20 rounded-full -mb-10 ml-4 z-50 shadow-lg"
					 src="{_user.profile.profilePicture}"
					 alt="profile">
			<input type="text" class="!bg-transparent border-none"
						 bind:value={_user.profile.displayName}
						 on:change={update}>
		</div>
		<img class="block relative object-cover flex-grow w-full h-20 z-0 rounded" src="{_user.profile.bannerPicture}"
				 alt="banner">
	</div>
{/if}
