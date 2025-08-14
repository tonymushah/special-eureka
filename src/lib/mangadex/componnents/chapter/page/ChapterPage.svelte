<script lang="ts">
	import { derived } from "svelte/store";
	import { slide } from "svelte/transition";
	import { isDrawerFixed } from "./contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "./contexts/isDrawerOpen";
	import ChapterDrawer from "./drawer/ChapterDrawer.svelte";
	import ChapterReadingMode from "./readinMode/ChapterReadingMode.svelte";
	import ChapterPageHeader from "./top-info/ChapterPageHeader.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";

	const isFixed = isDrawerFixed();
	const shouldShowHeader = derived(isFixed, (fixed) => {
		return !fixed;
	});
	const open = isDrawerOpenWritable();
</script>

<article>
	<ChapterDrawer left={$isSidebarRtl}>
		<div class="chap-d-content">
			{#if $shouldShowHeader}
				<div
					class="header"
					transition:slide={{
						axis: "y"
					}}
				>
					<ChapterPageHeader
						onmenuClick={() => {
							$open = !$open;
						}}
						onmenuPress={(e) => {
							if (e.key == "Enter") {
								$open = !$open;
							}
						}}
					/>
				</div>
			{/if}
			<section class="content">
				<!-- TODO Fix this -->
				<!-- <ChapterReadingMode /> -->
			</section>
		</div>
	</ChapterDrawer>
</article>

<style lang="scss">
	div.chap-d-content {
		display: grid;
		height: -webkit-fill-available;
		width: 100%;
		grid-template-areas:
			"header header header header"
			"content content content content"
			"content content content content"
			"content content content content";
		div.header {
			grid-area: header;
		}
		section.content {
			grid-area: content;
			height: -webkit-fill-available;
			overflow: hidden;
			display: grid;
			// NOTE This css looks ass on Linux,
			// Maybe we can reactivate it on Windows or Macos if it look better
			/// height: 100cqh;
		}
	}
	article {
		display: contents;
	}
	section.content {
		width: 100%;
	}
</style>
