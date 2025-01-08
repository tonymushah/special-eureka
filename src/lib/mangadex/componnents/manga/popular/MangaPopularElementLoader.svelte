<script lang="ts">
	import TagComponnents from "@mangadex/componnents/tag/TagComponnents.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import DangerBadge from "@mangadex/componnents/theme/tag/DangerBadge.svelte";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher, onMount } from "svelte";
	import Content from "./Content.svelte";
	import Layout from "./Layout.svelte";
	import NoIndex from "./NoIndex.svelte";
	import AuthorLink from "./authors/AuthorLink.svelte";
	type Author = {
		id: string;
		name: string;
	};
	interface Props {
		index?: number;
		title: string;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		authors: Author[];
	}

	let {
		index = -1,
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
</script>

<Layout coverImage="">
	<!-- @migration-task: migrate this slot by hand, `no-index` is an invalid identifier -->
	<NoIndex {index} slot="no-index" />
	<div
		class="cover"
		role="button"
		onkeydown={(e) => {}}
		tabindex="0"
		onclick={(e) => {
			dispatch("click", e);
		}}
	>
		<Skeleton width="13em" height="20em" border_radius={"0.25em"} />
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
	div.cover {
		margin: 1em;
	}
</style>
