<script lang="ts">
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	interface Props {
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		language?: Language | undefined;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		tags,
		contentRating = ContentRating.Safe,
		language = undefined,
		mangaId
	}: Props = $props();
	let src = $derived($coverImage);

	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		tagClick: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
</script>

<Layout on:click --max-height="11em" {mangaId}>
	{#if src}
		<Image coverImage={src} {coverImageAlt} />
	{:else}
		<Skeleton height="11em" width="7em" />
	{/if}
	<Content
		on:tagClick={(e) => {
			dispatch("tagClick", e.detail);
		}}
		{title}
		{status}
		{description}
		{tags}
		{contentRating}
		{language}
	/>
</Layout>
