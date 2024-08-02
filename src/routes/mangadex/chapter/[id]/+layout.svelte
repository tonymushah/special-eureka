<script lang="ts">
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<slot />
