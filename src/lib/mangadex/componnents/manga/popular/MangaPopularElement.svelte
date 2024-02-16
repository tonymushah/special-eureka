<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Layout from "./Layout.svelte";
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import AuthorLink from "./authors/AuthorLink.svelte";
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
</script>

<Layout {coverImage} on:click>
	<div class="cover">
		<img src={coverImage} alt={coverImageAlt} />
	</div>
	<div class="content">
		<div class="title">
			<p>{title}</p>
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
</style>
