<script lang="ts">
	import Sidebar from "$lib/mangadex/componnents/sidebar/Sidebar.svelte";
	import "@fontsource-variable/josefin-sans/index.css";
	import "@fontsource/poppins/latin.css";
	import MangaDexThemeProvider from "@mangadex/componnents/theme/MangaDexThemeProvider.svelte";
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { client } from "@mangadex/gql/urql";
	import { custom } from "@mangadex/theme";
	import { getContextClient, setContextClient, subscriptionStore } from "@urql/svelte";
	import { v4 } from "uuid";
	setContextClient(client);
	const sub_id = v4();
	const rtl = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	const theme = custom;
</script>

<MangaDexThemeProvider {theme}>
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
</MangaDexThemeProvider>

<style>
	.provider {
		width: 100%;
		display: inline-flex;
		color: var(--text-color);
	}
	.inner {
		height: 100vh;
		scroll-behavior: smooth;
		overflow-y: scroll;
		margin-left: 1em;
		margin-right: 1em;
	}
</style>
