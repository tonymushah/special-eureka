<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container">
	<PageTitle title="Updates" withReturn titleType={1} />
	{@render children?.()}
</div>

<style lang="scss">
	.container {
		margin: 0px 10px;
	}
</style>
