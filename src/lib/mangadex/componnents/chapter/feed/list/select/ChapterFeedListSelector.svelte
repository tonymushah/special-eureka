<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ChapterFeedStyle } from "@mangadex/gql/graphql";
	import { GridIcon, ListIcon } from "svelte-feather-icons";
	import { RiLayoutRowLine } from "svelte-remixicon";
	import type { Writable } from "svelte/store";

	interface Props {
		style: Writable<ChapterFeedStyle>;
	}

	let { style }: Props = $props();
	const size = "20";
</script>

<div class="tab-select">
	<ButtonAccent
		onclick={() => {
			style.set(ChapterFeedStyle.CoverLess);
		}}
		variant={$style == ChapterFeedStyle.CoverLess ? "5" : "1"}
	>
		<div class="icon">
			<ListIcon {size} />
		</div>
	</ButtonAccent>
	<ButtonAccent
		onclick={() => {
			style.set(ChapterFeedStyle.CoverFull);
		}}
		variant={$style == ChapterFeedStyle.CoverFull ? "5" : "1"}
	>
		<div class="icon">
			<RiLayoutRowLine {size} />
		</div>
	</ButtonAccent>
</div>

<style lang="scss">
	.tab-select {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px;
	}
</style>
