<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { derived } from "svelte/store";
	import { isReadingDirectionModifiable as isModifiable } from "../../../contexts/currentChapterReadingMode";
	import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
	import Icon from "./reading-direction/Icon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	const isReadingDirectionModifiable = isModifiable();
	const label = derived(readingDirection, ($direction) => {
		if ($direction == ReadingDirection.Ltr) {
			return "Left to Right";
		} else {
			return "Right to Left";
		}
	});
</script>

{#if $isReadingDirectionModifiable}
	<SettingsTransitComp>
		<ButtonAccentOnlyLabel
			oneLine
			variant="3"
			label={$label}
			icon={Icon}
			on:click={() => {
				if ($readingDirection == ReadingDirection.Ltr) {
					readingDirection.set(ReadingDirection.Rtl);
				} else {
					readingDirection.set(ReadingDirection.Ltr);
				}
			}}
		/>
	</SettingsTransitComp>
{/if}
