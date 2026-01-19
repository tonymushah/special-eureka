<script lang="ts">
	import { sideBarActionType as action } from "./action";
	import {
		PanelLeft,
		PanelLeftDashed,
		PanelRight,
		PanelRightDashed,
		CircleSlash2 as SlashIcon
	} from "@lucide/svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import { SidebarMode } from "@mangadex/gql/graphql";

	const size = "18";
	let sidebarRtl = $derived($isSidebarRtl);
</script>

<div>
	{#if $action == SidebarMode.Default}
		{#if sidebarRtl}
			<PanelRight {size} />
		{:else}
			<PanelLeft {size} />
		{/if}
	{:else if $action == SidebarMode.Floating}
		{#if sidebarRtl}
			<PanelRightDashed {size} />
		{:else}
			<PanelLeftDashed {size} />
		{/if}
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
