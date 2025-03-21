<script lang="ts">
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import Content from "./base2/Content.svelte";
	import Image from "./base2/Image.svelte";
	import Layout from "./base2/Layout.svelte";

	interface Props {
		coverImage: string;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		language?: Language | undefined;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		tags,
		contentRating = ContentRating.Safe,
		language = undefined
	}: Props = $props();
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
	<Content on:tagClick {title} {status} {description} {tags} {contentRating} {language} />
</Layout>
