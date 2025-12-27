<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { Megaphone } from "@lucide/svelte";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Your Reports" href={route("/mangadex/report")}>
	{#snippet icon()}
		<Megaphone size="24" />
	{/snippet}
</Menu>
