<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
	const MainLayoutDyn = import("./MainLayout.svelte").then((m) => m.default);
</script>

{#await MainLayoutDyn}
	<main>
		<h1>Loading</h1>
	</main>
{:then MainLayout}
	<MainLayout>
		{@render children?.()}
	</MainLayout>
{:catch err}
	<main>
		<h2>Error</h2>
		<p>{new String(err)}</p>
	</main>
{/await}

<style lang="scss">
	main {
		width: 100%;
		height: 100cqh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media (prefers-color-scheme: dark) {
		main {
			background-color: #001b1c;
			color: #fbffbe;
		}
	}
	@media (prefers-color-scheme: light) {
		main {
			background-color: #fbffbe;
			color: #001b1c;
		}
	}
</style>
