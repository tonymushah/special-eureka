<script lang="ts">
	import { route } from "$lib/ROUTES";
	import { SettingsIcon } from "svelte-feather-icons";
	import Menu from "../base/Menu.svelte";
</script>

<Menu label="Settings" href={route("/mangadex/settings")}>
	{#snippet icon()}
		<SettingsIcon size="24" />
	{/snippet}
</Menu>
