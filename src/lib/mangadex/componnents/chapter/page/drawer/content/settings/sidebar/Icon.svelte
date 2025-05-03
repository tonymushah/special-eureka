<script lang="ts">
	import { RiSideBarFill, RiSidebarFoldLine } from "svelte-remixicon";
	import { sideBarActionType as action } from "./action";
	import { SlashIcon } from "svelte-feather-icons";
	import { SidebarMode } from "@mangadex/gql/graphql";

	const size = "18";
</script>

<div>
	{#if $action == SidebarMode.Default}
		<RiSideBarFill size={`${size}px`} />
	{:else if $action == SidebarMode.Floating}
		<RiSidebarFoldLine size={`${size}px`} />
	{:else}
		<SlashIcon {size} />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
