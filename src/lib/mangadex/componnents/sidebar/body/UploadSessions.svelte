<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { CloudUpload } from "@lucide/svelte";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Upload sessions" href={route("/mangadex/upload")}>
	{#snippet icon()}
		<CloudUpload size="26" />
	{/snippet}
</Menu>
