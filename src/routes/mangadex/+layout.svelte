<script lang="ts">
	const Layout = import("./MangaDexLayout.svelte").then((mod) => mod.default);
	interface Props {
		children?: import("svelte").Snippet;
	}
	let { children }: Props = $props();
</script>

{#await Layout}
	<p>Loading :3</p>
{:then Layout}
	<Layout>
		{@render children?.()}
	</Layout>
{/await}
