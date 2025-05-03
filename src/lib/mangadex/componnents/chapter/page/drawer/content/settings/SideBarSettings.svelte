<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { registerListeners, sideBarActionType, toggleAction } from "./sidebar/action";
	import { derived } from "svelte/store";
	import { onMount } from "svelte";
	import Icon from "./sidebar/Icon.svelte";
	import { SidebarMode } from "@mangadex/gql/graphql";
	const label = derived(sideBarActionType, ($action) => {
		switch ($action) {
			case SidebarMode.Default:
				return "SideBar Normal";
			case SidebarMode.Floating:
				return "SideBar Floating";
			case SidebarMode.Hidden:
				return "SideBar Hidden";
			default:
				return "SideBar ??";
		}
	});
	onMount(() => registerListeners());
</script>

<ButtonAccentOnlyLabel icon={Icon} variant="3" label={$label} onclick={toggleAction} />
