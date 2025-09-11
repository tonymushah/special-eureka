<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import ChapterElement2 from "../../../base/element2/ChapterElement2.svelte";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";

	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	interface Events {
		ondownload?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		ondownloadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onmangaClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onmangaKeyClick?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		mangaId: string;
		chapterId: string;
		mangaTitle: string;
		chapterTitle?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
	}

	let {
		mangaId,
		chapterId,
		mangaTitle,
		chapterTitle = undefined,
		lang,
		groups = [],
		uploader,
		upload_date,
		ondownload,
		ondownloadKeyPress,
		onmangaClick,
		onmangaKeyClick
	}: Props = $props();
	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: mangaId,
			coverArtId: mangaId
		})
	);
</script>

<div class="content">
	<div
		tabindex="0"
		role="button"
		onkeypress={(e) => {
			onmangaKeyClick?.({
				...e,
				id: mangaId
			});
		}}
		class="manga-title"
		onclick={(e) => {
			onmangaClick?.({
				...e,
				id: mangaId
			});
		}}
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
	>
		<h4>{mangaTitle}</h4>
	</div>
	<div class="chapter">
		<ChapterElement2
			{lang}
			{upload_date}
			id={chapterId}
			{ondownload}
			{ondownloadKeyPress}
			{chapterTitle}
			{groups}
			{uploader}
		/>
	</div>
</div>

<style lang="scss">
	.chapter {
		width: 100%;
	}
	div.manga-title {
		font-weight: 800;
		font-size: 16px;
	}
	div.manga-title > h4 {
		display: -webkit-box;
		margin: 2px;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
		color: var(--text-color);
		transition: color 300ms ease-in-out;
	}
	.manga-title:hover > h4 {
		color: var(--primary);
	}
	.manga-title:hover {
		cursor: pointer;
	}
	div.content {
		padding-left: 12px;
		flex-grow: 3;
		text-overflow: ellipsis;
		text-align: start;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}
</style>
