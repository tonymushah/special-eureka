<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher, onMount } from "svelte";
	import Content from "./Content.svelte";
	import Layout from "./Layout.svelte";
	import NoIndex from "./NoIndex.svelte";
	type Author = {
		id: string;
		name: string;
	};
	interface Props {
		index?: number;
		coverImage: string;
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
	const dispatch = createEventDispatcher<{
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
	let isCoverLoading = $state(true);
	let isCoverError = $state(false);
	onMount(() => {
		let img = new Image();
		img.addEventListener("load", (e) => {
			isCoverLoading = false;
		});
		img.addEventListener("error", (e) => {
			isCoverLoading = false;
			isCoverError = true;
		});
		img.src = coverImage;
	});
</script>

<Layout {coverImage}>
	{#snippet nOindex()}
		<NoIndex {index} />
	{/snippet}

	<div
		class="cover"
		role="button"
		onkeydown={(e) => {}}
		tabindex="0"
		onclick={(e) => {
			dispatch("click", e);
		}}
	>
		{#if isCoverLoading}
			<Skeleton width="13em" height="20em" />
		{:else if isCoverError}
			<Skeleton width="13em" height="20em" />
		{:else}
			<img src={coverImage} alt={coverImageAlt} />
		{/if}
	</div>
	<Content
		{title}
		{description}
		{tags}
		{contentRating}
		{authors}
		on:click
		on:authorClick
		on:tagClick
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
