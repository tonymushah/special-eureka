<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import { writable } from "svelte/store";

	interface Props {
		children?: Snippet;
		data: LayoutData;
	}
	let { children, data }: Props = $props();
</script>

<div class="layout">
	<PageTitle withReturn>{data.names.get("en")}</PageTitle>
	<div class="page-layout">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.layout {
		margin: 8px 12px;
	}
</style>
