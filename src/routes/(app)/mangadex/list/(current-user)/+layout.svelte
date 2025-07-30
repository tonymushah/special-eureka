<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container">
	<PageTitle withReturn titleType={1}>Your Mangadex Custom Lists</PageTitle>

	{@render children?.()}
</div>

<style lang="scss">
	.container {
		margin: 0px 10px;
	}
</style>
