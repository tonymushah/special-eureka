<script lang="ts">
	import { BookmarkIcon } from "svelte-feather-icons";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
</script>

<SubMenu label="Follows">
	{#snippet icon()}
		<BookmarkIcon size="24" />
	{/snippet}
	<SubMenuItem label="Updates" href={route("/mangadex/titles/feed")} />
	<SubMenuItem label="Online Library" href={route("/mangadex/titles/library")} />
	<SubMenuItem label="MDList" href={route("/mangadex/list")} />
	<SubMenuItem label="Following Groups" href={route("/mangadex/group/followed")} />
	<SubMenuItem label="Following Users" href={route("/mangadex/user/followed")} />
	<SubMenuItem label="Following Titles" href={route("/mangadex/titles/followed")} />
	<SubMenuItem label="Following MDLists" href={route("/mangadex/list/followed")} />
</SubMenu>
