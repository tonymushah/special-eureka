<script lang="ts">
	import { derived } from "svelte/store";
	import { isDrawerFixed } from "./contexts/isDrawerFixed";
	import ChapterPageHeader from "./top-info/ChapterPageHeader.svelte";
	import ChapterDrawer from "./drawer/ChapterDrawer.svelte";
	import { isDrawerOpen, isDrawerOpenWritable } from "./contexts/isDrawerOpen";
	import { slide } from "svelte/transition";
	import OpenMenuButton from "./open-menu/OpenMenuButton.svelte";
	import ChapterReadingMode from "./readinMode/ChapterReadingMode.svelte";

	const isFixed = isDrawerFixed();
	const shouldShowHeader = derived(isFixed, (fixed) => {
		return !fixed;
	});
	const open = isDrawerOpenWritable();
</script>

<article>
	{#if $isFixed && !$open}
		<OpenMenuButton />
	{/if}
	<ChapterDrawer>
		<div class="chap-d-content">
			{#if $shouldShowHeader}
				<div
					class="header"
					transition:slide={{
						axis: "y"
					}}
				>
					<ChapterPageHeader
						on:menuClick={() => {
							$open = !$open;
						}}
						on:menuPress={({ detail: e }) => {
							if (e.key == "Enter") {
								$open = !$open;
							}
						}}
					/>
				</div>
			{/if}
			<section class="content">
				<ChapterReadingMode />
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
		}
	}
	article {
		display: contents;
	}
	section.content {
		width: 100%;
	}
</style>
