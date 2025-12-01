<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Menu from "../base/Menu.svelte";
	import { RiUploadCloud2Line as UploadIcon } from "svelte-remixicon";
</script>

<Menu label="Upload sessions" href={route("/mangadex/upload")}>
	{#snippet icon()}
		<UploadIcon size="28px" />
	{/snippet}
</Menu>
