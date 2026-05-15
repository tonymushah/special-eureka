<script lang="ts">
	// import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { LayoutList, Grid3x2, LayoutGrid } from "@lucide/svelte";
	import { getMangaListStyleContextWritable } from "../contexts/style";

	const style = getMangaListStyleContextWritable();
	const size = "24";
</script>

<div class="tab-select">
	<button
		onclick={() => {
			style.set(MangaListStyle.Grid);
		}}
		class:active={$style == MangaListStyle.Grid}
		class="grid-mode"
	>
		<div class="icon">
			<LayoutGrid {size} />
		</div>
	</button>
	<button
		onclick={() => {
			style.set(MangaListStyle.Rows);
		}}
		class:active={$style == MangaListStyle.Rows}
		class="row-list-mode"
	>
		<div class="icon">
			<LayoutList {size} />
		</div>
	</button>
	<button
		onclick={() => {
			style.set(MangaListStyle.Cover);
		}}
		class:active={$style == MangaListStyle.Cover}
		class="cover-mode"
	>
		<div class="icon">
			<Grid3x2 {size} />
		</div>
	</button>
</div>

<style lang="scss">
	.tab-select {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--space-xs);
	}
	button {
		--box-shadow-color: var(--mid-tone);
		color: var(--text-color);
		background-color: var(--accent-l2);
		border: 3px var(--box-shadow-color) solid;
		box-shadow: 0px 4px 0px var(--box-shadow-color);
		font-family: inherit;
		transform: translateY(-4px);
	}
	button:hover {
		background-color: var(--accent-l2-hover);
	}
	button:active {
		background-color: var(--accent-l2-active);
		transform: translateY(0px);
		box-shadow: none;
	}
	button.active {
		background-color: var(--accent-l2-active);
		transform: translateY(0px);
		box-shadow: none;
	}
	button:focus {
		outline: none;
		--box-shadow-color: var(--contrast-l1);
	}
	.grid-mode {
		border-top-left-radius: var(--radius-md);
		border-bottom-left-radius: var(--radius-md);
	}
	.cover-mode {
		border-top-right-radius: var(--radius-md);
		border-bottom-right-radius: var(--radius-md);
	}
</style>
