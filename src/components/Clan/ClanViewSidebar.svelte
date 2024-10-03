<script lang="ts">
	import type { Clan } from '$lib/api';

	import HomeIcon from 'virtual:icons/mdi/home';
	import ChatIcon from 'virtual:icons/mdi/chat';
	import MemberIcon from 'virtual:icons/mdi/people';
	import EventIcon from 'virtual:icons/mdi/events';
	import CollapseIcon from 'virtual:icons/mdi/caret';
	import ArrowIcon from 'virtual:icons/mdi/arrow-right-circle-outline';

	export let CurrentTab: string;
	export let Clan: Clan;
</script>

<div class="flex flex-col w-64 h-fit gap-1">
	<button
		class="navbutton"
		on:click={() => {CurrentTab = "Home"}}
	>
		<HomeIcon />
		Home
	</button>
	<button
		class="navbutton"
		on:click={() => {CurrentTab = "Chat"}}
	>
		<ChatIcon />
		Chat
	</button>
	<button
		class="navbutton"
		on:click={() => {CurrentTab = "Members"}}
	>
		<MemberIcon />
		Members
	</button>
	<button
		class="navbutton"
		on:click={() => {CurrentTab = "Events"}}
	>
		<EventIcon />
		Events
	</button>
</div>

<style lang="postcss">
    .navbutton {
        @apply flex items-center gap-2 font-medium text-zinc-300 text-xs px-3 py-3 text-left hover:bg-zinc-800 bg-zinc-900 rounded-lg
    }
</style>