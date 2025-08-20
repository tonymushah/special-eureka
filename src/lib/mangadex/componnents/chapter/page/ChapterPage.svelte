<script lang="ts">
	import { derived } from "svelte/store";
	import { slide } from "svelte/transition";
	import { isDrawerFixed } from "./contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "./contexts/isDrawerOpen";
	import ChapterDrawer from "./drawer/ChapterDrawer.svelte";
	import ChapterReadingMode from "./readinMode/ChapterReadingMode.svelte";
	import ChapterPageHeader from "./top-info/ChapterPageHeader.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import getCurrentChapterImages from "./utils/getCurrentChapterImages";
	import { debounce, delay } from "lodash";
	import ChapterPages from "@mangadex/stores/chapter/pages";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import type { Action } from "svelte/action";
	import { onDestroy } from "svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Progress from "./progress/Progress.svelte";

	const isFixed = isDrawerFixed();
	const shouldShowHeader = derived(isFixed, (fixed) => {
		return !fixed;
	});
	const open = isDrawerOpenWritable();
	const images = getCurrentChapterImages();

	const triggerFunc = debounce(() =>
		delay(() => {
			ChapterPages.refetchIncompletes(images).catch((e) => {
				addErrorToast("Error on sending messages", e);
			});
		}, 1000)
	);
	const observer = new IntersectionObserver(triggerFunc, {
		threshold: 1.0
	});
	const mount: Action = (node) => {
		observer.observe(node);
		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	};
	onDestroy(() => {
		observer.disconnect();
	});
</script>

<svelte:window onfocus={triggerFunc} />

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
				{#if $images.pagesLen}
					<ChapterReadingMode />
				{:else}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="trigger" use:mount onmouseenter={triggerFunc}>
						<div>
							<ButtonAccent
								isBase
								onclick={() => {
									triggerFunc();
								}}>Trigger...</ButtonAccent
							>
						</div>
					</div>
				{/if}
				<Progress />
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
			padding: 10px;
		}
		section.content {
			grid-area: content;
			height: -webkit-fill-available;
			overflow: hidden;
			display: grid;
			position: relative;
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
	.trigger {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
