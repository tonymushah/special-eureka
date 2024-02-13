<script lang="ts">
	import IndicationParagraph from "../IndicationParagraph.svelte";
	export let type: "blue" = "blue";
	export let innerText: string;
</script>

<IndicationParagraph {type}>
	{innerText}
</IndicationParagraph>
