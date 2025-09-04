<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="content">
	<PageTitle title={"Latest uploads"} withReturn titleType={1} />
	<AppTitle title={"Latest Uploads - MangaDex"} />
	{@render children?.()}
</div>

<style lang="scss">
	.content {
		margin: 0px 12px;
	}
</style>
