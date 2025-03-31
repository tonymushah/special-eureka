<script lang="ts">
	import { route } from "$lib/ROUTES";
	import {} from "svelte-feather-icons";
	import Menu from "../base/Menu.svelte";
	import logo from "./graphql/GraphQL_Logo.svg";
</script>

<Menu label="GraphQL" href={route("/mangadex/graphiql")}>
	{#snippet icon()}
		<img  alt="grahql-logo" src={logo} />
	{/snippet}
</Menu>

<style lang="scss">
	img {
		width: 24px;
	}
</style>
