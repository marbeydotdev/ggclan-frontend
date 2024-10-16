<script lang="ts">
	import { Api } from '$lib/Api-generated.ts/Api';
	import { onMount } from 'svelte';

	onMount(() => {
		let p = new Api();
		p.v1.achievementsGetList().then((data) => {
			alert(data.data[0].name);
		});
	});
</script>
