<script lang="ts">
	import StatusBadge from "./StatusBadge.svelte";

	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
	export let label: string;
</script>

<StatusBadge {color}>
	{label}
</StatusBadge>
