<script lang="ts">
	import type { Achievement } from '$lib/api';

	export let Achieved: Achievement;
</script>

<div
	class="flex hover-effect flex-grow basis-1/2 rounded-xl p-5 cursor-pointer">
	<span class="flex items-center text-center basis-1/4 text-lg font-semibold">{Achieved.name}</span>

	<div>
		<small class="block">Achieved
			on {new Intl.DateTimeFormat(navigator.language, {
				dateStyle: "medium",
				timeStyle: "short"
			}).format(new Date(Achieved.created))}</small>
		<p>{Achieved.description}</p>
	</div>

</div>