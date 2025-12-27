<script lang="ts">
	import { Search } from "@lucide/svelte";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
	import { isLogged } from "@mangadex/utils/auth";
	import { dev } from "$app/environment";
</script>

<SubMenu label="Search">
	{#snippet icon()}
		<Search size="24" />
	{/snippet}
	<SubMenuItem label="Titles" href={route("/mangadex/titles")} />
	<SubMenuItem label="Authors" href={route("/mangadex/author")} />
	<SubMenuItem label="Groups" href={route("/mangadex/group")} />
	{#if $isLogged || dev}
		<SubMenuItem label="Users" href={route("/mangadex/user")} />
	{/if}
</SubMenu>
