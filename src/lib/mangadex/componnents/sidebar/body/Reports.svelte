<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Menu from "../base/Menu.svelte";
	import { RiMegaphoneLine } from "svelte-remixicon";
</script>

<Menu label="Your Reports" href={route("/mangadex/report")}>
	{#snippet icon()}
		<RiMegaphoneLine size="26px" />
	{/snippet}
</Menu>
