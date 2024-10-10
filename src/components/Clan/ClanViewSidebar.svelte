<script lang="ts">
	export let CurrentTab: string;
</script>

<div class="flex flex-row sm:flex-col w-full sm:w-32 h-fit mr-5 sm:gap-0 gap-3 overflow-x-auto">
	<button
		class="navbutton"
		class:nav-enabled={CurrentTab === "Home"}
		on:click={() => {CurrentTab = "Home"}}
	>
		Home
	</button>
	<button
		class="navbutton"
		class:nav-enabled={CurrentTab === "Chat"}
		on:click={() => {CurrentTab = "Chat"}}
	>
		Chat
	</button>
	<button
		class="navbutton"
		class:nav-enabled={CurrentTab === "Members"}
		on:click={() => {CurrentTab = "Members"}}
	>
		Members
	</button>
	<button
		class="navbutton"
		class:nav-enabled={CurrentTab === "Events"}
		on:click={() => {CurrentTab = "Events"}}
	>

		Events
	</button>
	<a class="navbutton" href="/app">
		Back</a>
</div>

<style lang="postcss">
    .navbutton {
        @apply hover:bg-zinc-100 hover:text-zinc-900 flex border border-transparent items-center gap-2 font-medium text-zinc-700 dark:text-zinc-300 text-xs px-3 py-3 text-left rounded-lg mb-2 select-none
    }

    .nav-enabled {
        @apply bg-zinc-100 dark:text-zinc-900
    }
</style>