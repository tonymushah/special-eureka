<script lang="ts">
	import StatusSpan from "../StatusSpan.svelte";

	interface Props {
		type: "red" | "green" | "yellow" | "blue" | "gray" | "purple";
		innerText: string;
	}

	let { type, innerText }: Props = $props();
</script>

<StatusSpan {type}>
	{innerText}
</StatusSpan>
