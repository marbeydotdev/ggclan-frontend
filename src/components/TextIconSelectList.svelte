<script lang="ts">
	export let items: { name: string; icon: string; value: string; selected: boolean }[]
	export let multipleChoice: boolean = true
	import Checked from 'virtual:icons/gravity-ui/square-check'
	import Unchecked from 'virtual:icons/gravity-ui/square'
	import Selected from 'virtual:icons/gravity-ui/circle-check'
	import Deselected from 'virtual:icons/gravity-ui/circle'

	import {fade} from 'svelte/transition';

	function getSelected(){
		return items.filter((item) => item.selected)
	}

	function onItemSelect(item){
		if (multipleChoice){
			items[item].selected = !items[item].selected;
		} else {
			getSelected().forEach((item) => {item.selected = false});
			items[item].selected = true;
		}
	}

</script>

<div class="flex flex-col border-white/10 border border-t-0 bg-zinc-800/10 h-52 overflow-y-scroll scrollbar scrollbar-thumb-zinc-600 scrollbar-none">
		{#each items as item, index}
			<button in:fade|global={{delay: index * 50}} class="flex items-center w-full min-h-16 relative border-b border-white/10 px-4 hover:bg-zinc-400/5 transition-colors overflow-clip" on:click={() => onItemSelect(index)}>
				<img class="block object-contain aspect-square w-8 mr-5" alt="{item.name}" src="{item.icon}">
				<span class="block mr-auto text-left text-sm text-zinc-300">{item.name}</span>
				<img alt="fancy" src="{item.icon}" class="absolute inset-0 w-full h-full blur-2xl opacity-30">
				<span class="block text-center w-4">
				{#if item.selected}
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