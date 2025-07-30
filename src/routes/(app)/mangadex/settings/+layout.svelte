<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="layout">
	<PageTitle titleType={1} title={"Settings"} withReturn />

	{@render children?.()}
</div>

<style lang="scss">
	.layout {
		margin: 8px 16px;
		width: 95%;
	}
</style>
