<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import Content from "./inner/Content.svelte";
	import CoverImage from "./inner/CoverImage.svelte";
	import Layout from "./inner/Layout.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	import LoaderImage from "./inner/LoaderImage.svelte";

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
		coverImageAlt: string;
		mangaTitle: string;
		chapterTitle?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
		haveBeenRead?: boolean;
		end?: boolean;
	}

	let {
		mangaId,
		chapterId,
		coverImageAlt,
		mangaTitle,
		chapterTitle = undefined,
		lang,
		groups = [],
		uploader,
		upload_date,
		haveBeenRead = $bindable(true),
		ondownload,
		ondownloadKeyPress,
		onmangaClick,
		onmangaKeyClick,
		end
	}: Props = $props();
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));

	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true,
		quality: "256"
	}));
</script>

<Layout bind:haveBeenRead {mangaId}>
	{#if coverImage}
		<CoverImage {coverImage} {coverImageAlt} {mangaId} {onmangaClick} {onmangaKeyClick} />
	{:else}
		<LoaderImage {mangaId} {onmangaClick} {onmangaKeyClick} />
	{/if}
	<Content
		{mangaId}
		{mangaTitle}
		{chapterId}
		{chapterTitle}
		{lang}
		{groups}
		{upload_date}
		{uploader}
		{ondownload}
		{ondownloadKeyPress}
		{onmangaClick}
		{onmangaKeyClick}
		{end}
	/>
</Layout>
