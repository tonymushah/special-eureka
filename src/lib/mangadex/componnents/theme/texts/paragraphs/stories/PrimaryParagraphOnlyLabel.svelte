<script lang="ts">
	import PrimaryParagraph from "../PrimaryParagraph.svelte";
	interface Props {
		variant?: "default" | "l1" | "l2";
		innerText: string;
	}

	let { variant = "default", innerText }: Props = $props();
</script>

<PrimaryParagraph {variant}>
	{innerText}
</PrimaryParagraph>
