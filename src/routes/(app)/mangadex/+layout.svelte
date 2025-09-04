<script lang="ts">
	const Layout = import("@mangadex/componnents/layout/MangaDexLayout.svelte").then(
		(mod) => mod.default
	);
	interface Props {
		children?: import("svelte").Snippet;
	}
	let { children }: Props = $props();
</script>

{#await Layout}
	<div class="loading">
		<div class="loading-inner">
			<h1>Loading :3</h1>
		</div>
	</div>
{:then MangaDexLayout}
	<MangaDexLayout>
		{@render children?.()}
	</MangaDexLayout>
{:catch e}
	<div class="loading">
		<div class="loading-inner">
			<h1>Error :3</h1>
			<p>{e}</p>
		</div>
	</div>
{/await}

<style lang="scss">
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: -webkit-fill-available;
		width: 100%;
		.loading-inner {
			height: 75cqh;
			width: 60%;
			border: 2px dashed plum;
			color: plum;
			border-radius: 12px;
			align-items: center;
			justify-content: center;
			display: flex;
		}
	}
</style>
