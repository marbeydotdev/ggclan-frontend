<script lang="ts">
	import CloseIcon from 'virtual:icons/mdi/close';
	import CreateIcon from 'virtual:icons/mdi/add';
	import GamePicker from './GamePicker.svelte';
	import { toast, toastType } from '$lib/toasts';
	import { createClan } from '$lib/api';

	let newName: string;
	let newDescription: string;
	let newPrivate: boolean;

	let opened: boolean = false;

	let processing: boolean = false;

	function create() {
		if (newName === '') {
			toast('Please enter a name.', toastType.Warning);
			return;
		}

		processing = true;

		createClan(newName, newDescription, newPrivate).then((result) => {
			if (result.status !== 200) {
				processing = false;
				return;
			}

			processing = false;
			toast('Clan has been created.', toastType.Success);
			opened = false;
		});

	}
</script>

<div class="block mt-3" class:loading={processing}>
	{#if opened}
		<button on:click={() => opened = false} class="button ml-auto mb-3">
			<CloseIcon />
			close
		</button>
		<input class="small mb-3 border-0 !bg-zinc-900" placeholder="Name" bind:value={newName} type="text">
		<div class="flex items-center mb-2">
			<small class="ml-3 mb-1 mr-auto text-zinc-400">Private</small>
			<input type="checkbox" bind:value={newPrivate} />
		</div>
		<textarea bind:value={newDescription} class="small h-32 border-none !bg-zinc-900 mb-2"
							placeholder="Description"></textarea>
		<GamePicker multiple="{false}" />
		<button on:click={create} class="button mt-3">Create</button>
	{:else}
		<button class="button" on:click={() => opened = true}>
			<CreateIcon />
			create clan
		</button>
	{/if}
</div>

<style lang="postcss">
    .loading {
        @apply pointer-events-none animate-pulse
    }
</style>