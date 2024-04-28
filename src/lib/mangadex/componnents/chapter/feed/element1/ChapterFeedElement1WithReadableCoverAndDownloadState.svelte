<script lang="ts">
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
	export let mangaId: string;
	export let chapterId: string;
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let mangaTitle: string;
	export let chapterTitle: string | undefined = undefined;
	export let lang: Language;
	export let groups: Group[] = [];
	export let uploader: Uploader;
	export let upload_date: Date;
	export let haveBeenRead: boolean = true;
	export let download_state: Readable<ChapterDownloadState>;
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
	$: image_ = $coverImage;
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
		bind:download_state={$download_state}
		on:download
		on:downloadKeyPress
		on:mangaClick
		on:mangaKeyClick
	/>
</Layout>
