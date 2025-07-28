<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<h1>General Settings</h1>

{@render children?.()}
