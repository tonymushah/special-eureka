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
	import Content from "./Content.svelte";
	import NoIndex from "./NoIndex.svelte";
	type Author = {
		id: string;
		name: string;
	};
	export let index: number = -1;
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

<Layout coverImage="">
	<NoIndex {index} />
	<div
		class="cover"
		role="button"
		on:keydown={(e) => {}}
		tabindex="0"
		on:click={(e) => {
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
