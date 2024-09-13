<script lang="ts">
	import { SearchIcon } from "svelte-feather-icons";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
</script>

<SubMenu label="Search">
	<SearchIcon slot="icon" size="24" />
	<SubMenuItem label="Manga" href={route("/mangadex/titles")} />
	<SubMenuItem label="Author" />
	<SubMenuItem label="Groups" />
</SubMenu>
