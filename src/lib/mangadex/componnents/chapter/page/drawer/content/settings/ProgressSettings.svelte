<script lang="ts">
	import { ProgressMode } from "@mangadex/gql/graphql";

	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import Icon from "./progress/Icon.svelte";
	import { derived } from "svelte/store";
	import { progressModeStore } from "@mangadex/stores/chapterLayout";

	const label = derived(progressModeStore, ($progress) => {
		switch ($progress) {
			case ProgressMode.Default:
				return "Showed Progress Bar";
			case ProgressMode.Floating:
				return "Floating Progress Bar";
			case ProgressMode.Hidden:
				return "Hidden Progress";
		}
	});
</script>

<SettingsTransitComp>
	<ButtonAccentOnlyLabel
		icon={Icon}
		oneLine
		variant="3"
		label={$label}
		onclick={() => {
			switch ($progressModeStore) {
				case ProgressMode.Default:
					$progressModeStore = ProgressMode.Floating;
					break;
				case ProgressMode.Floating:
					$progressModeStore = ProgressMode.Hidden;
					break;
				case ProgressMode.Hidden:
					$progressModeStore = ProgressMode.Default;
					break;
			}
		}}
	/>
</SettingsTransitComp>
