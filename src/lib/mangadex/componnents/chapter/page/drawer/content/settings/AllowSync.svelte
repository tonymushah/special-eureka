<script lang="ts">
	import { allowSync } from "@mangadex/stores/chapter/page/allowSync.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./allow-sync/Icon.svelte";

	let allow = $derived(allowSync.allow);
	let label = $derived(allow ? "Page number synced" : "Page number unsynced");
</script>

<SettingsTransitComp>
	<ButtonAccentOnlyLabel
		oneLine
		variant={allow ? "3" : "1"}
		{label}
		icon={Icon}
		onclick={() => {
			allowSync.allow = !allowSync.allow;
		}}
	/>
</SettingsTransitComp>
