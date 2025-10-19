<script lang="ts">
	import { SearchIcon } from "svelte-feather-icons";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
	import { isLogged } from "@mangadex/utils/auth";
	import { dev } from "$app/environment";
</script>

<SubMenu label="Search">
	{#snippet icon()}
		<SearchIcon size="24" />
	{/snippet}
	<SubMenuItem label="Titles" href={route("/mangadex/titles")} />
	<SubMenuItem label="Authors" href={route("/mangadex/author")} />
	<SubMenuItem label="Groups" href={route("/mangadex/group")} />
	{#if $isLogged || dev}
		<SubMenuItem label="Users" href={route("/mangadex/user")} />
	{/if}
</SubMenu>
