<script lang="ts">
	import type { Snippet } from "svelte";
	import "./global.css";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

{@render children?.()}
