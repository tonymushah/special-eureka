<script lang="ts">
	import StatusSpan from "../StatusSpan.svelte";

	export let type: "red" | "green" | "yellow" | "blue" | "gray" | "purple";
	export let innerText: string;
</script>

<StatusSpan {type}>
	{innerText}
</StatusSpan>
