<script lang="ts">
	import AccentBadge from "./AccentBadge.svelte";

	export let label: string;
	export let variant: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt" =
		"default";
</script>

<AccentBadge {variant}>
	{label}
</AccentBadge>
