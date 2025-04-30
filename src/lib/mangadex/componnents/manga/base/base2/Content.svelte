<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import DefaultSpan from "@mangadex/componnents/theme/texts/span/DefaultSpan.svelte";
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import PublicationStatusTag from "../../publicationStatusTag/PublicationStatusTag.svelte";

	interface Events {
		ontagClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
				id: string;
			}
		) => any;
	}

	interface Props extends Events {
		title: string;
		status: MangaStatus;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		language?: Language | undefined;
	}

	let {
		title,
		status,
		description,
		tags,
		contentRating = ContentRating.Safe,
		language,
		ontagClick
	}: Props = $props();

	$effect(() => {
		console.debug(language);
	});
</script>

<div class="body">
	<div class="top-body">
		<div class="title">
			<p>
				{#if language}
					<FlagIcon lang={language} />
				{/if}
				{title}
			</p>
		</div>
		<div class="publication">
			<DefaultSpan --font-size="12px">
				<span class="pub-tag">Publication :</span>
				<PublicationStatusTag {status} />
			</DefaultSpan>
		</div>
	</div>
	<div class="bottom-body">
		<div class="tags">
			{#if contentRating == ContentRating.Erotica || contentRating == ContentRating.Pornographic}
				<DangerBadge variant="l1">
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
				onclick={(e) => {
					ontagClick?.(e);
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
	@media (width < 600px) {
		.pub-tag {
			display: none;
		}
	}
	div.title > p {
		margin: 0px;
		font-size: 20px;
		-webkit-box-orient: vertical;
		line-clamp: 1;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		overflow: hidden;
		font-weight: 700;
	}
	div.top-body {
		gap: 10px;
		display: grid;
		grid-template-areas: "title publication";
		flex-direction: row;
		align-items: start;
		grid-template-columns: auto 160px;
		.title {
			grid-area: title;
		}
		.publication {
			grid-area: publication;
		}
	}
	div.body {
		display: grid;
		margin: 10px;
		gap: 10px;
		grid-template-areas: "top" "bottom";
		grid-template-rows: 30px auto;
		flex-grow: 1;
		align-items: center;
		.top-body {
			grid-area: top;
		}
		.bottom-body {
			grid-area: bottom;
		}
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
</style>
