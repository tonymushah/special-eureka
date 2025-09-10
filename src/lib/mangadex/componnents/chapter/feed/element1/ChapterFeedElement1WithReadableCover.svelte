<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import type { Readable } from "svelte/store";
	import Content from "./inner/Content.svelte";
	import CoverImage from "./inner/CoverImage.svelte";
	import Layout from "./inner/Layout.svelte";
	import LoaderImage from "./inner/LoaderImage.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
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
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		mangaTitle: string;
		chapterTitle?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
		haveBeenRead?: boolean;
	}

	let {
		mangaId,
		chapterId,
		coverImage,
		coverImageAlt,
		mangaTitle,
		chapterTitle = undefined,
		lang,
		groups = [],
		uploader,
		upload_date,
		haveBeenRead = $bindable(true),
		onmangaClick,
		onmangaKeyClick,
		ondownload,
		ondownloadKeyPress
	}: Props = $props();

	let image_ = $derived($coverImage);
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout bind:haveBeenRead {mangaId}>
	{#if image_}
		<CoverImage
			coverImage={image_}
			{coverImageAlt}
			{mangaId}
			{onmangaClick}
			{onmangaKeyClick}
		/>
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
	/>
</Layout>
