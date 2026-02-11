<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import Content from "./base1/Content.svelte";
	import Image from "./base1/Image.svelte";
	import Layout from "./base1/Layout.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		withFull?: boolean;
		mangaId: string;
		blur?: boolean;
	}

	let {
		coverImageAlt,
		title,
		status,
		description,
		withFull = false,
		mangaId,
		onclick,
		blur
	}: Props = $props();
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true,
		quality: "256"
	}));
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout {onclick} --layout-width={withFull ? "100%" : "19em"} {mangaId}>
	{#if coverImage}
		<Image {coverImage} {coverImageAlt} {blur} />
	{:else}
		<Skeleton width="100px" height="160px" />
	{/if}
	<Content {title} {status} {description} />
</Layout>
