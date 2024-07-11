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
	</ChapterDrawer>
</article>

<style lang="scss">
	article {
		max-width: 100%;
		height: 100%;
	}
	section.content {
		width: 100%;
	}
</style>
