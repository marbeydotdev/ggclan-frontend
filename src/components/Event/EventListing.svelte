<script lang="ts">
	import RightIcon from 'virtual:icons/mdi/menu-right';
</script>

<div
	class="flex cursor-pointer p-5 hover:bg-gradient-to-bl hover:from-zinc-800 hover:to-zinc-900 border border-transparent hover:border-zinc-600 gap-3 mb-2 rounded-xl transition-colors">
	<img class="w-24 h-24 object-contain rounded-full p-2" src="/favicon.png" alt="pfp" />
	<div class="block flex-grow">
		<span class="block font-semibold">Event Name</span>
		<small class="block">Clan Name</small>
		<p>Event Description</p>
	</div>
	<div class="flex items-center">
		<RightIcon />
	</div>
</div>