<script lang="ts">
	import { BookIcon } from "svelte-feather-icons";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { route } from "$lib/ROUTES";
</script>

<SubMenu label="Titles">
	{#snippet icon()}
		<BookIcon size="24" />
	{/snippet}
	<SubMenuItem label="Recently Popular" />
	<SubMenuItem label="Latest Uploads" href={route("/mangadex/titles/latest-uploads")} />
	<SubMenuItem label="Recently Added" href={route("/mangadex/titles/recently-added")} />
	<SubMenuItem href={route("/mangadex/title/random")} label="Random" />
</SubMenu>
