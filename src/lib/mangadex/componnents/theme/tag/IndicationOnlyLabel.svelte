<script lang="ts">
	import IndicationBadge from "./IndicationBadge.svelte";

	export let variant: "blue" = "blue";
	export let label: string;
</script>

<IndicationBadge {variant}>
	{label}
</IndicationBadge>
