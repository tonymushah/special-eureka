<script lang="ts">
	import IndicationSpan from "../IndicationSpan.svelte";

	export let type: "blue" = "blue";
	export let innerText: string;
</script>

<IndicationSpan {type}>
	{innerText}
</IndicationSpan>
