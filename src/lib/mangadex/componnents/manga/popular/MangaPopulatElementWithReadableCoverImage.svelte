<script lang="ts">
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import { derived as der, type Readable } from "svelte/store";
	import MangaPopularElement from "./MangaPopularElement.svelte";
	import MangaPopularElementLoader from "./MangaPopularElementLoader.svelte";

	type Author = {
		id: string;
		name: string;
	};
	interface Props {
		index?: number;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		authors: Author[];
	}

	let {
		index = -1,
		coverImage,
		coverImageAlt,
		title,
		description,
		tags,
		contentRating = ContentRating.Safe,
		authors
	}: Props = $props();
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
		authorClick: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
			id: string;
		};
		tagClick: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
	const image = der(coverImage, (v) => v);
	let image_ = $derived($image ?? "");
</script>

{#if $image}
	<MangaPopularElement
		on:authorClick
		on:click
		on:tagClick
		coverImage={image_}
		{index}
		{coverImageAlt}
		{tags}
		{title}
		{contentRating}
		{authors}
		{description}
	/>
{:else}
	<MangaPopularElementLoader
		on:authorClick
		on:click
		on:tagClick
		{index}
		{tags}
		{title}
		{contentRating}
		{authors}
		{description}
	/>
{/if}
