<script lang="ts">
	import { RiSideBarFill, RiSidebarFoldLine } from "svelte-remixicon";
	import { sideBarActionType as action, SideBarActionType } from "./action";
	import { SlashIcon } from "svelte-feather-icons";

	const size = "18";
</script>

<div>
	{#if $action == SideBarActionType.Default}
		<RiSideBarFill size={`${size}px`} />
	{:else if $action == SideBarActionType.Floating}
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
