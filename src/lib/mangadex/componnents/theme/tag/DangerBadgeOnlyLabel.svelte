<script lang="ts">
	import DangerBadge from "./DangerBadge.svelte";

	export let type: "default" | "l1" | "l2" = "default";
	export let label: string;
</script>

<DangerBadge {type}>
	{label}
</DangerBadge>
