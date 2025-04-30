<script lang="ts">
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { derived as der, type Readable } from "svelte/store";
	import MangaPopularElement from "./MangaPopularElement.svelte";
	import MangaPopularElementLoader from "./MangaPopularElementLoader.svelte";

	type Author = {
		id: string;
		name: string;
	};

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
		onauthorClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			}
		) => any;
		ontagClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
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
		authors,
		onauthorClick,
		onclick,
		ontagClick
	}: Props = $props();

	const image = der(coverImage, (v) => v);
	let image_ = $derived($image ?? "");
</script>

{#if $image}
	<MangaPopularElement
		{onauthorClick}
		{onclick}
		{ontagClick}
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
		{onauthorClick}
		{onclick}
		{ontagClick}
		{index}
		{tags}
		{title}
		{contentRating}
		{authors}
		{description}
	/>
{/if}
