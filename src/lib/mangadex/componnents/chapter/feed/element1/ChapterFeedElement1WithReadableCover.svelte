<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { createEventDispatcher } from "svelte";
	import Content from "./inner/Content.svelte";
	import CoverImage from "./inner/CoverImage.svelte";
	import Layout from "./inner/Layout.svelte";
	import type { Readable } from "svelte/store";
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
	interface Props {
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
		download_state: ChapterDownloadState;
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
		download_state
	}: Props = $props();
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	createEventDispatcher<{
		download: MouseEnvDiv & {
			id: string;
		};
		downloadKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		mangaClick: MouseEnvDiv & {
			id: string;
		};
		mangaKeyClick: KeyboardEnvDiv & {
			id: string;
		};
	}>();
	let image_;
	run(() => {
		image_ = $coverImage;
	});
</script>

<Layout bind:haveBeenRead>
	{#if image_}
		<CoverImage
			bind:coverImage={image_}
			{coverImageAlt}
			{mangaId}
			on:mangaClick
			on:mangaKeyClick
		/>
	{:else}
		<LoaderImage {mangaId} on:mangaClick on:mangaKeyClick />
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
		{download_state}
		on:download
		on:downloadKeyPress
		on:mangaClick
		on:mangaKeyClick
	/>
</Layout>
