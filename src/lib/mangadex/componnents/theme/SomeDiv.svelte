<script lang="ts">
	import type { ClassValue } from "svelte/elements";

	interface Props {
		children?: import("svelte").Snippet;
		class?: ClassValue;
	}

	let { children, class: _cl }: Props = $props();
</script>

<div class={_cl}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		font-family: var(--fonts);
		display: contents;
	}
</style>
