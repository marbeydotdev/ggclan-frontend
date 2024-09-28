<script lang="ts">
	import { type User } from '$lib/api';
	import { logout, user } from '$lib/auth';
	import { goto } from '$app/navigation';

	let opened: boolean = false;

	let _user: User | null;

	user.subscribe((u => {
		_user = u;
	}));

	function nav(link: string) {
		opened = false;
		goto(link);
	}

</script>

<div class="relative block min-w-12 max-w-12 min-h-12 max-h-12 aspect-square z-50">
	<button class="min-w-full max-w-full min-h-full max-h-full" on:click={() => {opened = !opened}}>
		<img class="min-w-full max-w-full min-h-full max-h-full object-contain rounded-full ring-zinc-900 ring-2 p-2"
				 src="{_user?.profile?.profilePicture}"
				 alt="profile">
	</button>
	{#if opened}
		<div
			class="absolute border border-white/10 rounded flex flex-col w-52 right-0 top-16 text-left backdrop-blur">
			<span class="block px-3 py-2">{_user?.profile?.displayName}</span>
			<button class="menu-item" on:click={() => {nav('/app')}}>Home</button>
			<button class="menu-item" on:click={() => {nav('/app/account')}}>Account</button>
			<button on:click={() => {opened=false;logout()}} class="!text-red-600 menu-item">
				Logout
			</button>
		</div>
	{/if}

</div>

<style lang="postcss">
    .menu-item {
        @apply block text-left border-t first-of-type:border-t-0 border-zinc-800 bg-zinc-900 p-3 font-normal text-sm hover:bg-zinc-800
    }
</style>