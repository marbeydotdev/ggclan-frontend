<script lang="ts">
	import type { Achievement } from '$lib/api';

	export let Achieved: Achievement;
</script>

<div
	class="flex flex-col md:flex-row flex-grow rounded-xl p-3 mb-3 dark:bg-zinc-900 bg-zinc-100 dark:shadow-xl">
	<span
		class="flex items-center basis-1/4 text-2xl font-semibold text-yellow-500">{Achieved.name}</span>

	<div>

		<p class="mb-3">{Achieved.description}</p>
		<small class="block text-xs text-zinc-500">{new Intl.DateTimeFormat(navigator.language, {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(Achieved.created))}</small>
	</div>
</div>