<script lang="ts">
	import type { Root } from "react-dom/client";
	import { onDestroy, onMount } from "svelte";
	import type { Fetcher } from "@graphiql/toolkit";
	import { pluginName } from "@mangadex/const";
	import createFetcher from "mizuki-graphiql-fetcher";
	import { browser, dev } from "$app/environment";

	const fetcher: Fetcher = createFetcher(pluginName);

	let divRoot: HTMLElement | undefined = $state();
	let root: Root | undefined = $state();

	if (dev && browser) {
		onMount(async function () {
			const { createRoot } = await import("react-dom/client");
			const render = await import("./graphql/render").then((m) => m.default);
			if (divRoot != undefined) {
				if (root != undefined) {
					root.unmount();
				} else {
					root = createRoot(divRoot);
				}
				try {
					render({ root, fetcher });
				} catch (error) {
					console.error(error);
				}
			}
		});
		onDestroy(function () {
			if (root != undefined) root.unmount();
		});
	}
</script>

<div bind:this={divRoot}></div>

<style>
	div {
		height: -webkit-fill-available;
		display: grid;
	}
</style>
