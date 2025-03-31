<script lang="ts">
	import IndicationParagraph from "../IndicationParagraph.svelte";
	interface Props {
		type?: "blue";
		innerText: string;
	}

	let { type = "blue", innerText }: Props = $props();
</script>

<IndicationParagraph {type}>
	{innerText}
</IndicationParagraph>
