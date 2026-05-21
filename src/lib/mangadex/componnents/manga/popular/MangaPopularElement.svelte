<script lang="ts">
	import coverNotFound from "@mangadex/assets/artworks/cover-not-found.jpg";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { onMount } from "svelte";
	import Content from "./Content.svelte";
	import Layout from "./Layout.svelte";
	import NoIndex from "./NoIndex.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { get_cover_image } from "@mangadex/utils/cover-art/get_cover_art.svelte";

	type Author = {
		id: string;
		name: string;
	};

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			},
		) => any;
		onauthorClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			},
		) => any;
		ontagClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			},
		) => any;
	}
	interface Props extends Events {
		index?: number;
		title: string;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		authors: Author[];
		mangaId: string;
	}

	let {
		index = -1,
		title,
		description,
		tags,
		contentRating = ContentRating.Safe,
		authors,
		onauthorClick,
		onclick,
		ontagClick,
		mangaId,
	}: Props = $props();

	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: mangaId,
			coverArtId: mangaId,
			tags: tags.map((tag) => ({
				id: tag.id,
				name: new Map([["id", tag.name]]),
			})),
			authors,
		}),
	);
	let coverImage = get_cover_image(() => ({
		asManga: true,
		id: mangaId,
		quality: "512",
	}));
	let coverImageBack = get_cover_image(() => ({
		asManga: true,
		id: mangaId,
		quality: "256",
	}));
</script>

<Layout coverImage={coverImageBack.data}>
	{#snippet nOindex()}
		<NoIndex {index} />
	{/snippet}

	<div
		class="cover"
		role="button"
		onkeydown={(e) => {}}
		tabindex="0"
		onclick={(e) => {
			onclick?.(e);
		}}
	>
		{#if coverImage.isSuccess}
			<img src={coverImage.data} alt={mangaId} />
		{:else if coverImage.error}
			<img src={coverNotFound} alt={mangaId} />
		{:else}
			<Skeleton width="13em" height="20em" />
		{/if}
	</div>
	<Content
		{title}
		{description}
		{tags}
		{contentRating}
		{authors}
		{onclick}
		{onauthorClick}
		{ontagClick}
	/>
</Layout>

<style lang="scss">
	.cover {
		margin: 1em;
		img {
			border-radius: 0.25rem;
			max-width: 13em;
			height: 20em;
			object-fit: cover;
		}
	}
</style>
