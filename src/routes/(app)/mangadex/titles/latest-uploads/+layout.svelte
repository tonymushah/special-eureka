<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="content">
	<PageTitle title={"Latest uploads"} withReturn titleType={1} />
	{@render children?.()}
</div>

<style lang="scss">
	.content {
		margin: 0px 12px;
	}
</style>
