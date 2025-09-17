<script lang="ts">
	import ContentRatingTag from "@mangadex/componnents/content-rating/ContentRatingTag.svelte";
	import TagComponnentsFlex from "@mangadex/componnents/tag/TagComponnentsFlex.svelte";
	import { MangaDownloadState } from "@mangadex/download/manga";
	import { ContentRating, type MangaStatus, type ReadingStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { readable, type Readable } from "svelte/store";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import {
		setTopCoverAltContextStore,
		setTopCoverContextStore,
		setTopMangaDownloadContextStore,
		setTopMangaIdContextStore,
		setTopMangaIsFollowingContextStore,
		setTopMangaRatingContextStore,
		setTopMangaReadingStatusContextStore,
		setTopMangaTitleContextStore
	} from "./context";
	import type { Author } from "./index";
	import MangaStatusComp from "./MangaStatus.svelte";
	import type { TopMangaStatistics } from "./stats";
	import TopInfoAuthors from "./TopInfoAuthors.svelte";
	import TopInfoButtons from "./TopInfoButtons.svelte";
	import TopInfoCover from "./TopInfoCover.svelte";
	import TopInfoLayout from "./TopInfoLayout.svelte";
	import TopMangaStats from "./TopMangaStats.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";

	type ClickEventHandler<A = {}> = (
		ev: MouseEvent & {
			currentTarget: EventTarget & HTMLElement;
		} & A
	) => any;
	interface Events {
		onreadingStatus?: (ev: ReadingStatusEventDetail) => any;
		onrating?: (ev: number) => any;
		ondownload?: ClickEventHandler;
		ondelete?: ClickEventHandler;
		onaddToList?: ClickEventHandler;
		onread?: ClickEventHandler;
		onreport?: ClickEventHandler;
		onupload?: ClickEventHandler;
		ondownloading?: ClickEventHandler;
		ontag?: ClickEventHandler<{ id: string }>;
		oncomments?: ClickEventHandler;
	}

	interface Props extends Events {
		id: string;
		title: string;
		altTitle?: string | undefined;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		authors: Author[];
		tags: Tag[];
		status: MangaStatus;
		year?: number | undefined;
		reading_status?: Readable<ReadingStatus | undefined>;
		isFollowing?: Readable<boolean | undefined>;
		rating?: Readable<number | undefined>;
		downloadState?: Readable<MangaDownloadState>;
		stats?: TopMangaStatistics | undefined;
		contentRating?: ContentRating;
		closeDialogOnAdd?: boolean;
		disableRead?: boolean;
		disableAddToList?: boolean;
		disableReport?: boolean;
		disableUpload?: boolean;
		disableAddToLibrary?: boolean;
		disableRating?: boolean;
	}

	let {
		id = $bindable(),
		title,
		altTitle = undefined,
		coverImage,
		coverImageAlt,
		authors,
		tags = $bindable(),
		status = $bindable(),
		year = $bindable(undefined),
		reading_status = readable<ReadingStatus | undefined>(undefined),
		isFollowing = readable<boolean | undefined>(undefined),
		rating = readable<number | undefined>(undefined),
		downloadState = readable(MangaDownloadState.Pending),
		stats = $bindable(undefined),
		contentRating = ContentRating.Safe,
		closeDialogOnAdd,
		onaddToList,
		oncomments,
		ondelete,
		ondownload,
		ondownloading,
		onrating,
		onread,
		onreadingStatus,
		onreport,
		ontag,
		onupload,
		disableAddToList,
		disableRead,
		disableReport,
		disableUpload,
		disableAddToLibrary,
		disableRating
	}: Props = $props();

	setTopMangaIdContextStore(id);
	setTopMangaTitleContextStore(title);
	setTopCoverContextStore(coverImage);
	setTopMangaReadingStatusContextStore(reading_status);
	setTopCoverAltContextStore(coverImageAlt);
	setTopMangaIsFollowingContextStore(isFollowing);
	setTopMangaRatingContextStore(rating);
	setTopMangaDownloadContextStore(downloadState);
</script>

<TopInfoLayout>
	{#snippet cover()}
		<div class="cover-image">
			<TopInfoCover />
		</div>
	{/snippet}
	<div class="content">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<section
			class="top"
			oncontextmenu={registerContextMenuEvent({
				preventDefault: true,
				additionalMenus: () => [
					ContextMenuItemProvider.menuItem({
						text: "Copy title",
						action() {
							writeText(title);
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Copy alt title",
						action() {
							if (altTitle) {
								writeText(altTitle);
							}
						},
						enabled: altTitle != undefined
					})
				]
			})}
		>
			<h1 class="title">{title}</h1>
			{#if altTitle}
				<h2 class="alt-title">{altTitle}</h2>
			{/if}
		</section>
		<section class="bottom">
			<TopInfoAuthors {authors} />
			<TopInfoButtons
				{closeDialogOnAdd}
				{onaddToList}
				{ondelete}
				{ondownload}
				{ondownloading}
				{onrating}
				{onread}
				{onreadingStatus}
				{onreport}
				{onupload}
				{disableAddToList}
				{disableRead}
				{disableReport}
				{disableUpload}
				{disableAddToLibrary}
				{disableRating}
			/>
			<div class="tag-status">
				<TagComponnentsFlex
					{tags}
					onclick={(e) => {
						ontag?.(e);
					}}
				>
					{#snippet pre()}
						<ContentRatingTag {contentRating} />
					{/snippet}
				</TagComponnentsFlex>
				<MangaStatusComp {status} {year} />
			</div>
			{#if stats != undefined}
				<div class="stats">
					<TopMangaStats
						bind:stats
						oncommentClick={(detail) => {
							oncomments?.(detail);
						}}
					/>
				</div>
			{/if}
		</section>
	</div>
</TopInfoLayout>

<style lang="scss">
	section.top {
		display: grid;
		margin-top: 18px;
		gap: 16px;
		h1 {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			margin: 0px;
			padding: 0px;
		}
	}
	div.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		section.bottom {
			display: flex;
			flex-direction: column;
			height: 60%;
			gap: 10px;
		}
	}
	@media (width >= 900px) {
		h1 {
			font-size: 40px;
			-webkit-line-clamp: 1;
			line-clamp: 1;
		}
		h2 {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			margin: 0px;
		}
	}
	@media (width < 900px) {
		h1.title {
			font-size: 30px;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		h2.alt-title {
			display: none;
		}
	}
</style>
