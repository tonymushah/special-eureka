<script lang="ts">
	// import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { LayoutList, Grid3x2, LayoutGrid } from "@lucide/svelte";
	import { getMangaListStyleContextWritable } from "../contexts/style";
	import buttonGroupCssMod from "@mangadex/componnents/theme/selects/button-group.module.scss";

	const style = getMangaListStyleContextWritable();
	const size = "24";
</script>

<div class={[buttonGroupCssMod.tabSelect]}>
	<button
		onclick={() => {
			style.set(MangaListStyle.Grid);
		}}
		disabled={$style == MangaListStyle.Grid}
		class={[
			"grid-mode",
			buttonGroupCssMod.button,
			$style == MangaListStyle.Grid && buttonGroupCssMod.active,
		]}
	>
		<div class={buttonGroupCssMod.icon}>
			<LayoutGrid {size} />
		</div>
	</button>
	<button
		onclick={() => {
			style.set(MangaListStyle.Rows);
		}}
		disabled={$style == MangaListStyle.Rows}
		class={[
			"row-list-mode",
			buttonGroupCssMod.button,
			$style == MangaListStyle.Rows && buttonGroupCssMod.active,
		]}
	>
		<div class={buttonGroupCssMod.icon}>
			<LayoutList {size} />
		</div>
	</button>
	<button
		onclick={() => {
			style.set(MangaListStyle.Cover);
		}}
		disabled={$style == MangaListStyle.Cover}
		class={[
			"cover-mode",
			buttonGroupCssMod.button,
			$style == MangaListStyle.Cover && buttonGroupCssMod.active,
		]}
	>
		<div class={buttonGroupCssMod.icon}>
			<Grid3x2 {size} />
		</div>
	</button>
</div>

<style lang="scss">
	.grid-mode {
		border-top-left-radius: var(--radius-md);
		border-bottom-left-radius: var(--radius-md);
	}
	.cover-mode {
		border-top-right-radius: var(--radius-md);
		border-bottom-right-radius: var(--radius-md);
	}
</style>
