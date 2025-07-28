<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	<section class="title">
		<PageTitle title={"Users"} withReturn />
	</section>

	{@render children?.()}
</div>

<style lang="scss">
	div {
		--layout-margin-x: 1.25em;
		--layout-margin-y: 0.5em;
		margin-left: var(--layout-margin-x);
		margin-right: var(--layout-margin-x);
		margin-top: var(--layout-margin-y);
		margin-bottom: var(--layout-margin-y);
	}
</style>
