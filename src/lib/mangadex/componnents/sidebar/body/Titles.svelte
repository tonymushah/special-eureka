<script lang="ts">
	import { BookIcon } from "svelte-feather-icons";
	import SubMenu from "../base/SubMenu.svelte";
	import SubMenuItem from "../base/SubMenuItem.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
</script>

<SubMenu label="Titles">
	{#snippet icon()}
		<BookIcon size="24" />
	{/snippet}
	<SubMenuItem label="Offline Library" />
	<SubMenuItem label="Latest Updates" />
	<SubMenuItem
		onclick={() => {
			goto(route("/mangadex/title/random"));
		}}
		label="Random"
	/>
	<SubMenuItem label="Recently Popular" />
</SubMenu>
