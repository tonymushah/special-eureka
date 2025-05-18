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
	<SubMenuItem label="Online Library" />
	<SubMenuItem label="MDList" href={route("/mangadex/list")} />
	<SubMenuItem label="Followed Groups" />
</SubMenu>
