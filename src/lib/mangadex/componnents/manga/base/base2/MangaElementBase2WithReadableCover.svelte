<script lang="ts">
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let title: string;
	export let status: MangaStatus;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
	$: src = $coverImage;

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

<Layout on:click --max-height="11em">
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
	/>
</Layout>
