<script lang="ts">
	import { render as timeRender, cancel as timeCancel } from "timeago.js";
	import { onDestroy, onMount } from "svelte";
	let timeago: HTMLTimeElement;
	onMount(() => {
		if (timeago) timeRender(timeago);
	});
	onDestroy(() => {
		if (timeago) timeCancel(timeago);
	});
	export let date: Date;
</script>

<timeago datetime={date.toDateString()} bind:this={timeago} />
