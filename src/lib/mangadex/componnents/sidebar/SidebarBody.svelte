<script lang="ts">
	import { dev } from "$app/environment";
	import { isLogged } from "@mangadex/utils/auth";
	import Follows from "./body/Follows.svelte";
	import Graphql from "./body/Graphql.svelte";
	import Home from "./body/Home.svelte";
	import OfflineServer from "./body/OfflineServer.svelte";
	import Search from "./body/Search.svelte";
	import Settings from "./body/Settings.svelte";
	import Titles from "./body/Titles.svelte";
</script>

<Home />

{#if $isLogged || dev}
	<Follows />
{/if}

<OfflineServer />

<Titles />

<Search />

{#if dev}
	<Graphql />
{/if}

<Settings />
