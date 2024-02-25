<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import Layout from "./Layout.svelte";
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import AuthorLink from "./authors/AuthorLink.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	type Author = {
		id: string;
		name: string;
	};
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
	export let authors: Author[];
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
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
	let isCoverLoading = true;
	let isCoverError = false;
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

<Layout {coverImage} on:click>
	<div class="cover">
		{#if isCoverLoading}
			<Skeleton width="15em" height="20em" />
		{:else if isCoverError}
			<Skeleton width="15em" height="20em" />
		{:else}
			<img src={coverImage} alt={coverImageAlt} />
		{/if}
	</div>
	<div class="content">
		<div class="title">
			<h2>{title}</h2>
		</div>
		<div class="tags">
			{#if contentRating == ContentRating.Erotica || contentRating == ContentRating.Pornographic}
				<DangerBadge type="l1">
					{#if contentRating == ContentRating.Erotica}
						Erotica
					{:else}
						Pornographic
					{/if}
				</DangerBadge>
			{:else if contentRating == ContentRating.Suggestive}
				<StatusBadge color="green">Suggestive</StatusBadge>
			{/if}
			<TagComponnents
				on:click={(e) => {
					dispatch("tagClick", e.detail);
				}}
				{tags}
			/>
		</div>
		<div class="description">
			<p>{description}</p>
		</div>
		<div class="authors">
			{#if authors}
				{#each authors as { id, name }}
					<AuthorLink {id} {name} />
				{/each}
			{/if}
		</div>
	</div>
</Layout>

<style lang="scss">
	.cover > img {
		margin: 1em;
		border-radius: 0.25rem;
		max-width: 15em;
	}
	.content {
		display: flex;
		margin: 1rem;
		flex-direction: column;
		align-items: start;
		text-align: start;
	}
	.tags {
		display: flex;
		gap: 0.25rem;
	}
	.description > p {
		-webkit-box-orient: vertical;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		display: -webkit-box;
		overflow: hidden;
	}
	.authors {
		display: flex;
		gap: 0.5rem;
	}
</style>
