<script lang="ts">
	import CreateIcon from 'virtual:icons/mdi/add';
	import GamePicker from '../../../../components/GamePicker.svelte';
	import { toast, toastType } from '$lib/toasts';
	import { createClan } from '$lib/api';
	import { goto } from '$app/navigation';
	import BackButton from '../../../../components/Navigation/BackButton.svelte';

	let selected: { name: string; icon: string; value: string }[];

	let newName: string;
	let newDescription: string;
	let newPrivate: boolean;

	let processing: boolean = false;

	function create() {
		if (newName === '') {
			toast('Please enter a name.', toastType.Warning);
			return;
		}

		if (selected.length === 0) {
			toast('Please select a game.', toastType.Warning);
			return;
		}

		processing = true;

		createClan(newName, newDescription, newPrivate, selected[0].name).then((result) => {
			if (result.status !== 200) {
				processing = false;
				return;
			}

			processing = false;
			toast('Clan has been created.', toastType.Success);
			goto('/app/clan/view?clanId=' + result.data.id);
		});

	}
</script>

<BackButton target="/app/clans" />

<div class="block mt-3 relative" class:loading={processing}>
	<input class="mb-3 w-full" placeholder="Name" bind:value={newName}
				 type="text">
	<div class="flex items-center mb-3 justify-between px-4">
		<span class="mr-auto text-zinc-400">Private</span>
		<input type="checkbox" class="w-6 h-6 rounded-full overflow-clip cursor-pointer blur dark:invert-0 invert"
					 bind:checked={newPrivate} />
	</div>
	<textarea bind:value={newDescription} class="h-32 mb-2 w-full"
						placeholder="Description"></textarea>
	<GamePicker multiple="{false}" bind:selected="{selected}" />
	<div class="flex items-center mt-3 gap-2">
		<button on:click={create} class="button">
			<CreateIcon />
			create
		</button>

	</div>
</div>

<style lang="postcss">
    .loading {
        @apply pointer-events-none animate-pulse
    }
</style>