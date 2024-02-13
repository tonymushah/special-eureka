<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import StatusBadge from "./StatusBadge.svelte";

	export let color: StatusColor;
	export let label: string;
</script>

<StatusBadge {color}>
	{label}
</StatusBadge>
