<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { HomeIcon } from "@lucide/svelte";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Home" href={route("/mangadex")}>
	{#snippet icon()}
		<HomeIcon size="24" />
	{/snippet}
</Menu>
