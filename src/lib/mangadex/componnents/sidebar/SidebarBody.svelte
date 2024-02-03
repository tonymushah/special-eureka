<script lang="ts">
	import { HomeIcon, BookIcon } from "svelte-feather-icons";
	import Menu from "./base/Menu.svelte";
	import SubMenu from "./base/SubMenu.svelte";
	import SubMenuItem from "./base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
</script>

<Menu label="Home" href={route("/mangadex")}>
	<HomeIcon slot="icon" />
</Menu>

<SubMenu label="Titles">
    <BookIcon slot="icon"/>
    <SubMenuItem label="Follows"/>
    <SubMenuItem label="Follows"/>
    <SubMenuItem label="Follows"/>
    <SubMenuItem label="Follows"/>
    <SubMenuItem label="Follows"/>
</SubMenu>