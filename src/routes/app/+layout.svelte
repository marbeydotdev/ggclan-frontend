<script lang="ts">
	import { token } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';

	$: {
		if (browser && token) {
			if (get(token) === null) {
				goto('/');
			}
		}
	}

</script>

<slot />