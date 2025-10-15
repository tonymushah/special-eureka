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
	import { debounce, delay, noop } from "lodash";
	import ChapterPages from "@mangadex/stores/chapter/pages";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import type { Action } from "svelte/action";
	import { onDestroy, onMount } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Progress from "./progress/Progress.svelte";
	import { getCurrentChapterData } from "./contexts/currentChapter";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import { openUrl, revealItemInDir } from "@tauri-apps/plugin-opener";
	import { exportPageMutationLoader } from "@mangadex/stores/chapter/page/export";
	import { isDataSaver } from "@mangadex/stores/chapterQuality";
	import { DownloadMode } from "@mangadex/gql/graphql";

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
	const data = getCurrentChapterData();
	onMount(() => {
		return data.subscribe((d) => {
			console.log(`changing data ${d.id}`);
			images.resendAll();
		});
	});
	onMount(() => {
		let sub = images.subscribe(noop);
		return sub;
	});
	let pageToUse: number = -1;
	const exportPageMutation = exportPageMutationLoader();
	const ev = registerContextMenuEvent({
		preventDefault: true,
		includeContext: false,
		stopPropagation: true,
		addSeparator: false,
		additionalMenus() {
			return [
				ContextMenuItemProvider.menuItem({
					text: "Open page in the broswer",
					action() {
						openUrl(`https://mangadex.org/chapter/${$data.id}/${pageToUse + 1}`);
					},
					enabled: pageToUse >= 0
				}),
				ContextMenuItemProvider.menuItem({
					text: "Save page",
					action() {
						exportPageMutation.mutate(
							{
								mode: $isDataSaver ? DownloadMode.DataSaver : DownloadMode.Normal,
								id: $data.id,
								page: pageToUse
							},
							{
								onSuccess(data, variables, onMutateResult, context) {
									addToast({
										data: { title: "Exported page" }
									});
									if (typeof data == "string") {
										revealItemInDir(data);
									}
								},
								onError(error, variables, onMutateResult, context) {
									addErrorToast("Cannot export page", error);
								}
							}
						);
					},
					enabled: pageToUse >= 0
				})
			];
		}
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
					<ChapterReadingMode
						oncontextmenu={(e) => {
							console.log(e);
							pageToUse = e.pageNumber;
							ev(e);
						}}
					/>
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
