<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import {
		registerListeners,
		SideBarActionType,
		sideBarActionType,
		toggleAction
	} from "./sidebar/action";
	import { derived } from "svelte/store";
	import { onMount } from "svelte";
	const label = derived(sideBarActionType, ($action) => {
		switch ($action) {
			case SideBarActionType.Default:
				return "SideBar Normal";
			case SideBarActionType.Floating:
				return "SideBar Floating";
			case SideBarActionType.Hidden:
				return "SideBar Hidden";
			default:
				return "SideBar ??";
		}
	});
	onMount(() => registerListeners());
</script>

<ButtonAccentOnlyLabel variant="3" label={$label} on:click={toggleAction} />
