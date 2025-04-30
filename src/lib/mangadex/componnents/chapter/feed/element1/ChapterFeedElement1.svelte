<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import Content from "./inner/Content.svelte";
	import CoverImage from "./inner/CoverImage.svelte";
	import Layout from "./inner/Layout.svelte";

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
		coverImage: string;
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
		ondownload,
		ondownloadKeyPress,
		onmangaClick,
		onmangaKeyClick
	}: Props = $props();
</script>

<Layout bind:haveBeenRead {mangaId}>
	<CoverImage {coverImage} {coverImageAlt} {mangaId} {onmangaClick} {onmangaKeyClick} />
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
