<script lang="ts">

import { user } from '$lib/auth';
</script>

<h1>Welcome back, {$user?.displayName ?? "..."}</h1>