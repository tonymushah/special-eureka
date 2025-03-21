<script lang="ts">
	import IndicationSpan from "../IndicationSpan.svelte";

	interface Props {
		type?: "blue";
		innerText: string;
	}

	let { type = "blue", innerText }: Props = $props();
</script>

<IndicationSpan {type}>
	{innerText}
</IndicationSpan>
