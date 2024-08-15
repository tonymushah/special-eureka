<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { getMangaListStyleContextWritable } from "../contexts/style";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { ColumnsIcon, GridIcon, ImageIcon, SidebarIcon } from "svelte-feather-icons";
	import {
		RiGalleryFill,
		RiLineLine,
		RiDashboardFill,
		RiGalleryView,
		RiLayoutColumnLine,
		RiLayoutRowLine
	} from "svelte-remixicon";

	const style = getMangaListStyleContextWritable();
	const size = "28";
</script>

<div class="tab-select">
	<ButtonAccent
		isBase
		on:click={() => {
			style.set(MangaListStyle.Grid);
		}}
		variant={$style == MangaListStyle.Grid ? "4" : "1"}
	>
		<GridIcon {size} />
	</ButtonAccent>
	<ButtonAccent
		isBase
		on:click={() => {
			style.set(MangaListStyle.Rows);
		}}
		variant={$style == MangaListStyle.Rows ? "5" : "1"}
	>
		<RiLayoutRowLine {size} />
	</ButtonAccent>
	<ButtonAccent
		isBase
		on:click={() => {
			style.set(MangaListStyle.Cover);
		}}
		variant={$style == MangaListStyle.Cover ? "5" : "1"}
	>
		<RiLayoutColumnLine {size} />
	</ButtonAccent>
</div>

<style lang="scss">
	.tab-select {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
</style>
