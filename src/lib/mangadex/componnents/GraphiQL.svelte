<script lang="ts">
	import "graphiql/graphiql.css";
	import type { Root } from "react-dom/client";
	import { onDestroy, onMount } from "svelte";
	import type { Fetcher } from "@graphiql/toolkit";
	import { pluginName } from "@mangadex/const";
	import createFetcher from "mizuki-graphiql-fetcher";

	const fetcher: Fetcher = createFetcher(pluginName);

	let divRoot: HTMLElement | undefined = $state();
	let root: Root | undefined = $state();

	onMount(async function () {
		const { createRoot } = await import("react-dom/client");
		const { GraphiQL } = await import("graphiql");
		if (divRoot != undefined) {
			if (root != undefined) {
				root.unmount();
			} else {
				root = createRoot(divRoot);
			}
			try {
				root.render(
					await GraphiQL({
						fetcher
					})
				);
			} catch (error) {
				console.error(error);
			}
		}
	});
	$inspect(root);
	onDestroy(function () {
		if (root != undefined) root.unmount();
	});
</script>

<div bind:this={divRoot}></div>

<style>
	div {
		height: -webkit-fill-available;
		display: grid;
	}
</style>
