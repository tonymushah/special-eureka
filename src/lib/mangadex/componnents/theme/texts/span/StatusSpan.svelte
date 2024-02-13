<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";

	export let type: StatusColor;
	$: red = type == "red";
	$: green = type == "green";
	$: yellow = type == "yellow";
	$: blue = type == "blue";
	$: gray = type == "gray";
	$: purple = type == "purple";
</script>

<span class:blue class:gray class:green class:purple class:red class:yellow>
	<slot />
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
