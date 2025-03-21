<script lang="ts">
	import { render as timeRender, cancel as timeCancel } from "timeago.js";
	import { onDestroy, onMount } from "svelte";
	let timeago: HTMLTimeElement = $state();
	onMount(() => {
		if (timeago) timeRender(timeago);
	});
	onDestroy(() => {
		if (timeago) timeCancel(timeago);
	});
	interface Props {
		date: Date;
	}

	let { date }: Props = $props();
</script>

<timeago datetime={date.toDateString()} bind:this={timeago}></timeago>
