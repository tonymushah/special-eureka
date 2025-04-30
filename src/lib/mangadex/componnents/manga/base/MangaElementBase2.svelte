<script lang="ts">
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import Content from "./base2/Content.svelte";
	import Image from "./base2/Image.svelte";
	import Layout from "./base2/Layout.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
		ontagClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
				id: string;
			}
		) => any;
	}

	interface Props extends Events {
		coverImage: string;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		tags: Tag[];
		contentRating?: ContentRating;
		language?: Language | undefined;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		tags,
		contentRating = ContentRating.Safe,
		language = undefined,
		mangaId,
		onclick,
		ontagClick
	}: Props = $props();
</script>

<Layout {onclick} --max-height="11em" {mangaId}>
	<Image {coverImage} {coverImageAlt} />
	<Content {ontagClick} {title} {status} {description} {tags} {contentRating} {language} />
</Layout>
