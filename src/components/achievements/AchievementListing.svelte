<script lang="ts">
	import type { Achievement } from '$lib/api';

	export let Achievement: Achievement;
</script>

<div
	class="block hover-effect flex-grow basis-1/4 aspect-square rounded-xl p-5 cursor-pointer">
	<span class="block text-lg font-semibold">{Achievement.name}</span>
	<small class="block mb-5">Achieved
		on {new Intl.DateTimeFormat(navigator.language, {
			dateStyle: "medium",
			timeStyle: "short"
		}).format(new Date(Achievement.created))}</small>
	<p>{Achievement.description}</p>
</div>