<script lang="ts">
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

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
		coverImage: Readable<string | undefined>;
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
		ontagClick,
		onclick
	}: Props = $props();
	let src = $derived($coverImage);
</script>

<Layout {onclick} --max-height="11em" {mangaId}>
	{#if src}
		<Image coverImage={src} {coverImageAlt} />
	{:else}
		<Skeleton height="11em" width="7em" />
	{/if}
	<Content {ontagClick} {title} {status} {description} {tags} {contentRating} {language} />
</Layout>
