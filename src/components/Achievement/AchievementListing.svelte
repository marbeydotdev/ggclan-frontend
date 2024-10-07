<script lang="ts">
	import type { Achievement } from '$lib/api';

	export let Achievement: Achievement;
</script>

<div
	class="block flex-grow basis-1/3 border border-transparent hover:border-yellow-100/50 aspect-square hover:bg-gradient-to-bl hover:from-zinc-800 hover:to-zinc-900 rounded-xl p-5 transition-colors cursor-pointer">
	<span class="block text-lg font-semibold">{Achievement.name}</span>
	<small class="block mb-5">Achieved on {Achievement.created}</small>
	<p>{Achievement.description}</p>
</div>