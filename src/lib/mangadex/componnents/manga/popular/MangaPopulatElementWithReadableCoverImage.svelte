<script lang="ts">
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import { derived, type Readable } from "svelte/store";
	import MangaPopularElement from "./MangaPopularElement.svelte";
	import MangaPopularElementLoader from "./MangaPopularElementLoader.svelte";

	type Author = {
		id: string;
		name: string;
	};
	export let index: number = -1;
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let title: string;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
	export let authors: Author[];
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
	const image = derived(coverImage, (v) => v);
	$: image_ = $image ?? "";
</script>

{#if $image}
	<MangaPopularElement
		on:authorClick
		on:click
		on:tagClick
		bind:coverImage={image_}
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
