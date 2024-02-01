<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { SvelteUIProvider, createTheme, theme as theme_old } from "@svelteuidev/core";
	import { getContextClient, setContextClient, subscriptionStore } from "@urql/svelte";
	import "@fontsource/poppins";
	import "@fontsource-variable/josefin-sans";
	import Sidebar from "$lib/mangadex/componnents/sidebar/Sidebar.svelte";
	import { graphql } from "@mangadex/gql";
	import { v4 } from "uuid";
	import { Direction } from "@mangadex/gql/graphql";
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
    setContextClient(client);
	const theme = createTheme("mangadex-theme", {
		fonts: {
			standard: "Poppins"
		}
	});
	const sub_id = v4();
	const rtl = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
</script>

<SvelteUIProvider class={theme}>
	<div class="provider">
		{#if $rtl.data?.watchSidebarDirection == Direction.Ltr}
			<Sidebar />
		{/if}
		<div class="inner">
			<slot />
		</div>
		{#if $rtl.data?.watchSidebarDirection == Direction.Rtl}
			<Sidebar />
		{/if}
	</div>
</SvelteUIProvider>

<style>
	.provider {
		display: flex;
		max-width: 100%;
	}
	.inner {
		margin-left: 1em;
	}
</style>
