<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { Toolbox } from "@lucide/svelte";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Settings" href={route("/mangadex/settings")}>
	{#snippet icon()}
		<Toolbox size="26" />
	{/snippet}
</Menu>
