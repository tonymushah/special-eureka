<script lang="ts">
	import { ChapterFeedStyle } from "@mangadex/gql/graphql";
	import { ListIcon, Rows3 } from "@lucide/svelte";
	import type { Writable } from "svelte/store";
	import buttonGroupCssMod from "@mangadex/componnents/theme/selects/button-group.module.scss";

	interface Props {
		style: Writable<ChapterFeedStyle>;
	}

	let { style }: Props = $props();
	const size = "24";
</script>

<div class={buttonGroupCssMod.tabSelect}>
	<button
		onclick={() => {
			style.set(ChapterFeedStyle.CoverLess);
		}}
		disabled={$style == ChapterFeedStyle.CoverLess}
		class={[
			buttonGroupCssMod.button,
			"list",
			$style == ChapterFeedStyle.CoverLess && buttonGroupCssMod.active,
		]}
	>
		<div class={[buttonGroupCssMod.icon, "aka-icon"]}>
			<ListIcon {size} />
		</div>
	</button>
	<button
		onclick={() => {
			style.set(ChapterFeedStyle.CoverFull);
		}}
		disabled={$style == ChapterFeedStyle.CoverFull}
		class={[
			buttonGroupCssMod.button,
			"rows",
			$style == ChapterFeedStyle.CoverFull && buttonGroupCssMod.active,
		]}
	>
		<div class={[buttonGroupCssMod.icon, "aka-icon"]}>
			<Rows3 {size} />
		</div>
	</button>
</div>

<style lang="scss">
	.list {
		border-top-left-radius: var(--radius-md);
		border-bottom-left-radius: var(--radius-md);
	}
	.rows {
		border-top-right-radius: var(--radius-md);
		border-bottom-right-radius: var(--radius-md);
	}
	.aka-icon {
		padding: 0px;
	}
</style>
