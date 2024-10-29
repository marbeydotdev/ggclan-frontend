<script lang="ts">
	import type { Achievement } from '$lib/api';

	export let Achieved: Achievement;
</script>

<div
	class="block hover-effect flex-grow basis-1/4 aspect-square rounded-xl p-5 cursor-pointer">
	<span class="block text-lg font-semibold">{Achieved.name}</span>
	<small class="block mb-5">Achieved
		on {new Intl.DateTimeFormat(navigator.language, {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(Achieved.created))}</small>
	<p>{Achieved.description}</p>
</div>