<script lang="ts">
	import { type User } from '$lib/api';
	import { logout, user } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

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
			transition:fly={{y: 50}}
			class="absolute rounded-xl flex flex-col w-64 right-0 top-16 px-5 py-5 gap-2 text-left border border-zinc-600 bg-zinc-950 shadow-xl shadow-black">
			<span
				class="block px-4 pt-3 mb-3 pb-4 font-normal text-sm border-b border-zinc-800">{_user?.profile?.displayName}</span>
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
        @apply block text-left hover:text-zinc-950 px-4 py-3 rounded-md font-normal text-sm hover:bg-zinc-100
    }
</style>