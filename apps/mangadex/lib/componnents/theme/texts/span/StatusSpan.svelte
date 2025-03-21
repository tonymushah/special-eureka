<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";

	interface Props {
		type: StatusColor;
		children?: import('svelte').Snippet;
	}

	let { type, children }: Props = $props();
	let red = $derived(type == "red");
	let green = $derived(type == "green");
	let yellow = $derived(type == "yellow");
	let blue = $derived(type == "blue");
	let gray = $derived(type == "gray");
	let purple = $derived(type == "purple");
</script>

<span class:blue class:gray class:green class:purple class:red class:yellow>
	{@render children?.()}
</span>

<style lang="scss">
	span {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--text-color);
	}
	.red {
		color: var(--status-red);
	}
	.green {
		color: var(--status-green);
	}
	.yellow {
		color: var(--status-yellow);
	}
	.blue {
		color: var(--status-blue);
	}
	.gray {
		color: var(--status-gray);
	}
	.purple {
		color: var(--status-purple);
	}
</style>
