<script lang="ts">
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import DefaultSpan from "@mangadex/componnents/theme/texts/span/DefaultSpan.svelte";
	import PublicationStatusTag from "../../publicationStatusTag/PublicationStatusTag.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";

	export let title: string;
	export let status: MangaStatus;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
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
			<TagComponnents
				on:click={(e) => {
					dispatch("tagClick", e.detail);
				}}
				{tags}
			/>
		</div>
		<div class="description">
			<Markdown source={description} />
		</div>
	</div>
</div>

<style lang="scss">
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
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
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
	div.description {
		text-align: left;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		display: -webkit-box;
		overflow: hidden;
		margin-top: 0.5em;
	}
	/*div.description {
		height: 5em;
		overflow: hidden;
	}*/
	div.publication {
		align-self: center;
	}
</style>
