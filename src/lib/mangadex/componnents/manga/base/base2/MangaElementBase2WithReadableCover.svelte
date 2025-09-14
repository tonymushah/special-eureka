<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { Readable } from "svelte/store";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import manga_title_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-title-to-lang-map";

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
		blur?: boolean;
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
		onclick,
		blur
	}: Props = $props();
	let src = $derived($coverImage);
	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: mangaId,
			coverArtId: mangaId,
			tags: tags.map((tag) => ({
				id: tag.id,
				name: new Map([["id", tag.name]])
			}))
		})
	);
</script>

<Layout {onclick} --max-height="11em" {mangaId}>
	{#if src}
		<Image coverImage={src} {coverImageAlt} {blur} />
	{:else}
		<Skeleton height="11em" width="7em" />
	{/if}
	<Content {ontagClick} {title} {status} {description} {tags} {contentRating} {language} />
</Layout>
