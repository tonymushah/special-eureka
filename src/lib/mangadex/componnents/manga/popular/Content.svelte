<script lang="ts">
	import MarkDown from "@mangadex/componnents/markdown/Markdown.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { ContentRating } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import AuthorLink from "./authors/AuthorLink.svelte";
	type Author = {
		id: string;
		name: string;
	};
	export let title: string;
	export let description: string;
	export let tags: Tag[];
	export let contentRating: ContentRating = ContentRating.Safe;
	export let authors: Author[];
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
</script>

<div class="content">
	<div class="content-top">
		<div
			class="title"
			role="button"
			on:keydown={(e) => {}}
			tabindex="0"
			on:click={(e) => {
				dispatch("click", e);
			}}
		>
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
			<MarkDown source={description} />
		</div>
	</div>
	<div class="authors">
		{#if authors}
			{#each authors as { id, name }}
				<AuthorLink {id} {name} />
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	div.title {
		transition: color 300ms ease-in-out;
		h2 {
			display: -webkit-box;
			margin: 2px;
			line-clamp: 2;
			-webkit-line-clamp: 2;
			overflow: hidden;
			-webkit-box-orient: vertical;
		}
	}
	div.title:hover {
		color: var(--primary);
		cursor: pointer;
	}
	div.title:active {
		color: var(--primary-l1);
	}
	.content {
		display: flex;
		margin: 1rem;
		flex-direction: column;
		align-items: start;
		text-align: start;
		height: 20em;
		justify-content: space-between;
		width: 100%;
		.content-top {
			width: 100%;
		}
	}
	.tags {
		display: flex;
		gap: 0.25rem;
	}
	.description {
		height: 10em;
		overflow-y: scroll;
		width: 100%;
	}
	.authors {
		display: flex;
		gap: 0.5rem;
	}
</style>
