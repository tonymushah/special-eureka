<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { HomeIcon } from "svelte-feather-icons";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Home" href={route("/mangadex")}>
	{#snippet icon()}
		<HomeIcon  size="24" />
	{/snippet}
</Menu>
