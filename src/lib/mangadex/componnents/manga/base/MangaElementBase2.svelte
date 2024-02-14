<script lang="ts">
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import Layout from "./base2/Layout.svelte";
	import { createEventDispatcher } from "svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import DefaultSpan from "@mangadex/componnents/theme/texts/span/DefaultSpan.svelte";
	import PublicationStatusTag from "../publicationStatusTag/PublicationStatusTag.svelte";
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
	export let status: MangaStatus;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<Layout on:click>
	<div class="cover">
		<img src={coverImage} alt={coverImageAlt} />
	</div>
	<div class="body">
		<div class="top-body">
			<div class="title"><p>{title}</p></div>
			<div class="publication">
				<DefaultSpan --font-size="12px"
					>Publication : <PublicationStatusTag {status} /></DefaultSpan
				>
			</div>
		</div>
		<div class="bottom-body">
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
				<TagComponnents {tags} />
			</div>
			<div class="description">
				<p>{description}</p>
			</div>
		</div>
	</div>
</Layout>

<style lang="scss">
	div.cover > img {
		max-height: 11em;
		object-fit: cover;
		width: 8em;
	}
	div.tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		height: 1.5em;
		overflow: hidden;
	}
	div.title > p {
		margin: 0px;
		font-size: 23px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 800;
	}
	div.top-body {
		gap: 10px;
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: start;
	}
	div.body {
		display: flex;
		flex-direction: column;
		margin: 10px;
		gap: 10px;
	}
	div.description > p {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	div.description {
		height: 5em;
		overflow: hidden;
	}
	div.publication {
		align-self: center;
	}
</style>
