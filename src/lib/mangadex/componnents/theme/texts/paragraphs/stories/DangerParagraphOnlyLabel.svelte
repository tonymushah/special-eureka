<script lang="ts">
	import DangerParagraph from "../DangerParagraph.svelte";
	interface Props {
		variant?: "default" | "l1" | "l2";
		innerText: string;
	}

	let { variant = "default", innerText }: Props = $props();
</script>

<DangerParagraph {variant}>
	{innerText}
</DangerParagraph>
