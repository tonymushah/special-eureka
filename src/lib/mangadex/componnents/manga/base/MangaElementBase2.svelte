<script lang="ts">
	import { ContentRating, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import Content from "./base2/Content.svelte";
	import Image from "./base2/Image.svelte";
	import Layout from "./base2/Layout.svelte";

	export let coverImage: string;
	export let coverImageAlt: string;
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

<Layout on:click --max-height="11em">
	<Image {coverImage} {coverImageAlt} />
	<Content on:tagClick {title} {status} {description} {tags} {contentRating} />
</Layout>
