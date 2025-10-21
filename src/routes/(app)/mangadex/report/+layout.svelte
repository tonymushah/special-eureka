<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="layout">
	<PageTitle title="Your reports" withReturn />

	{@render children?.()}
</div>

<style lang="scss">
	.layout {
		margin: 0px 24px;
	}
</style>
