<script lang="ts">
	import StatusBadge from "./StatusBadge.svelte";

	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
	export let variant: "light" | "filled" | "outline" | "dot" | "gradient" | undefined = undefined;
	export let label: string;
</script>

<StatusBadge {color} {variant}>
	{label}
</StatusBadge>
