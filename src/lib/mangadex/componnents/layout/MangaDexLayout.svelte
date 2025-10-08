<script lang="ts">
	import "@fontsource-variable/josefin-sans/index.css";
	import "@fontsource/poppins/latin.css";
	import MangaDexContextDataProvider from "@mangadex/componnents/MangaDexContextDataProvider.svelte";
	import MangaDexDefaultThemeProvider from "@mangadex/componnents/theme/MangaDexDefaultThemeProvider.svelte";
	import defaultProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { client } from "@mangadex/gql/urql";
	import { mangadexQueryClient } from "@mangadex/index";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
	import { setContextClient } from "@urql/svelte";
	import { onDestroy, onMount } from "svelte";
	import MainContent from "./MainContent.svelte";
	import MonoLoaders from "./MonoLoaders.svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}
	let { children }: Props = $props();
	onMount(async () => {
		const { mangadexTitleBar } = await import("@mangadex/titlebar");
		await mangadexTitleBar();
	});
	onMount(() => {
		return defaultProfile.subscribe(() => {});
	});
	onDestroy(async () => {
		const { defaultBehavior } = await import(
			"$lib/core/window-decoration/stores/decorations.svelte"
		);
		defaultBehavior();
	});
	setContextClient(client);
</script>

<QueryClientProvider client={mangadexQueryClient}>
	<SvelteQueryDevtools />
	<div class="d-content">
		<style>
			html::-webkit-scrollbar {
				display: none;
			}
		</style>
		<MangaDexContextDataProvider>
			<MangaDexDefaultThemeProvider>
				<MonoLoaders />
				<MainContent {children} />
			</MangaDexDefaultThemeProvider>
		</MangaDexContextDataProvider>
	</div>
</QueryClientProvider>

<style lang="scss">
	.d-content {
		display: contents;
	}
</style>
