<script lang="ts">
	import { ContentRating, Language, type MangaStatus } from "@mangadex/gql/graphql";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import Content from "./base2/Content.svelte";
	import Image from "./base2/Image.svelte";
	import Layout from "./base2/Layout.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
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
		coverImageAlt,
		title,
		status,
		description,
		tags,
		contentRating = ContentRating.Safe,
		language = undefined,
		mangaId,
		onclick,
		ontagClick,
		blur
	}: Props = $props();
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

	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true,
		quality: "256"
	}));
</script>

<Layout {onclick} --max-height="11em" {mangaId}>
	{#if coverImage.value}
		<Image coverImage={coverImage.value} {coverImageAlt} {blur} />
	{:else}
		<Skeleton width={"var(--element-w)"} height={"var(--element-h)"} />
	{/if}
	<Content {ontagClick} {title} {status} {description} {tags} {contentRating} {language} />
</Layout>
