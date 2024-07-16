<script lang="ts">
	import { derived } from "svelte/store";
	import { getCurrentChapterReadingModeWritable } from "../../../contexts/currentChapterReadingMode";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./reading-mode/Icon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";

	const mode = getCurrentChapterReadingModeWritable();
	const label = derived(mode, ($mode) => {
		switch ($mode) {
			case ReadingMode.DoublePage:
				return "Double Page";

			case ReadingMode.LongStrip:
				return "Long Strip";
			case ReadingMode.SinglePage:
				return "Single Page";
			case ReadingMode.WideStrip:
				return "Wide Strip";
			default:
				return "Nothing Selected";
		}
	});
</script>

<SettingsTransitComp>
	<ButtonAccentOnlyLabel
		variant="3"
		icon={Icon}
		label={$label}
		oneLine
		on:click={() => {
			switch ($mode) {
				case ReadingMode.SinglePage:
					mode.set(ReadingMode.DoublePage);
					break;
				case ReadingMode.DoublePage:
					mode.set(ReadingMode.LongStrip);
					break;
				case ReadingMode.LongStrip:
					mode.set(ReadingMode.WideStrip);
					break;
				case ReadingMode.WideStrip:
					mode.set(ReadingMode.SinglePage);
					break;
				default:
					break;
			}
		}}
	/>
</SettingsTransitComp>
