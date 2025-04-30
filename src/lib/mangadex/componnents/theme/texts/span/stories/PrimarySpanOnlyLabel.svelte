<script lang="ts">
	import PrimarySpan from "../PrimarySpan.svelte";
	interface Props {
		variant?: "default" | "l1" | "l2";
		innerText: string;
	}

	let { variant = "default", innerText }: Props = $props();
</script>

<PrimarySpan {variant}>
	{innerText}
</PrimarySpan>
