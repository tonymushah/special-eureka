<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { derived } from "svelte/store";
	import { isReadingDirectionModifiable as isModifiable } from "../../../contexts/currentChapterReadingMode";

	import Icon from "./reading-direction/Icon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import { getCurrentChapterDirectionWritable } from "../../../contexts/readingDirection";
	import { Direction } from "@mangadex/gql/graphql";
	const isReadingDirectionModifiable = isModifiable();
	const readingDirection = getCurrentChapterDirectionWritable();
	const label = derived(readingDirection, ($direction) => {
		if ($direction == Direction.Ltr) {
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
				if ($readingDirection == Direction.Ltr) {
					readingDirection.set(Direction.Rtl);
				} else {
					readingDirection.set(Direction.Ltr);
				}
			}}
		/>
	</SettingsTransitComp>
{/if}
