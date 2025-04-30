<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { GridIcon } from "svelte-feather-icons";
	import { RiLayoutColumnLine, RiLayoutRowLine } from "svelte-remixicon";
	import { getMangaListStyleContextWritable } from "../contexts/style";

	const style = getMangaListStyleContextWritable();
	const size = "20";
</script>

<div class="tab-select">
	<ButtonAccent
		onclick={() => {
			style.set(MangaListStyle.Grid);
		}}
		variant={$style == MangaListStyle.Grid ? "4" : "1"}
	>
		<div class="icon">
			<GridIcon {size} />
		</div>
	</ButtonAccent>
	<ButtonAccent
		onclick={() => {
			style.set(MangaListStyle.Rows);
		}}
		variant={$style == MangaListStyle.Rows ? "5" : "1"}
	>
		<div class="icon">
			<RiLayoutRowLine {size} />
		</div>
	</ButtonAccent>
	<ButtonAccent
		onclick={() => {
			style.set(MangaListStyle.Cover);
		}}
		variant={$style == MangaListStyle.Cover ? "5" : "1"}
	>
		<div class="icon">
			<RiLayoutColumnLine {size} />
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
