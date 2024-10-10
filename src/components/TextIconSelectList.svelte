<script lang="ts">
	export let items: { name: string; icon: string; value: string }[];
	export let multipleChoice: boolean = true;

	import Checked from 'virtual:icons/gravity-ui/square-check';
	import Unchecked from 'virtual:icons/gravity-ui/square';
	import Selected from 'virtual:icons/gravity-ui/circle-check';
	import Deselected from 'virtual:icons/gravity-ui/circle';
	import Close from 'virtual:icons/gravity-ui/square-Xmark';

	import { fade } from 'svelte/transition';

	export let selected: { name: string; icon: string; value: string }[] = [];

	function onItemSelect(item) {
		if (multipleChoice) {
			if (selected.find(item) != undefined) {
				selected = selected.filter(s => s !== item);
				return;
			}
			selected.push(item);
		} else {
			selected = [item];
		}
	}

</script>

<div
	class="flex flex-col border-white/10 border-0 border-t-0 dark:bg-zinc-800/10 overflow-y-scroll scrollbar scrollbar-thumb-zinc-600 max-h-40">
	{#each items as item, index}
		<button in:fade|global={{delay: index * 50}}
						class="flex items-center w-full min-h-14 relative border-b border-white/10 px-4 hover:bg-zinc-400/5 transition-colors overflow-clip"
						on:click={() => onItemSelect(item)}>
			<img class="block object-contain aspect-square w-8 mr-5" alt="{item.name}" src="{item.icon}">
			<span class="block mr-auto text-left text-sm dark:text-zinc-300">{item.name}</span>
			<img alt="fancy" src="{item.icon}"
					 class="absolute inset-0 w-full h-full blur-2xl dark:opacity-30 opacity-50 -z-10">
			<span class="block text-center w-4">
				{#if selected.find(a => a === item) !== undefined}
					{#if multipleChoice}
						<Checked />
					{:else}
						<Selected />
					{/if}
					{:else}
					{#if multipleChoice}
						<Unchecked />
					{:else}
						<Deselected />
					{/if}
					{/if}
			</span>
		</button>
	{/each}


</div>
<div class="block text-sm dark:text-zinc-400 w-full mt-2 ">
	{#each selected as item}
		<button
			class="flex justify-start items-center w-full h-8 bg-white/5 text-left px-3 border-b border-white/10 last:border-transparent">
			<img class="aspect-square w-4 mr-3" alt="icon" src="{item.icon}">
			<span class="mr-auto">{item.name}</span>
			<button>
				<Close />
			</button>
		</button>
	{/each}
</div>