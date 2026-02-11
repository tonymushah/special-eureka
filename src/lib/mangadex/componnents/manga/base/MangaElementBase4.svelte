<script lang="ts">
	import Layout from "./base4/Layout.svelte";
	import Content from "./base4/Content.svelte";
	import CoverImage from "./base4/CoverImage.svelte";
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
		mangaId: string;
		blur?: boolean;
	}

	let { coverImageAlt, title, mangaId, onclick, blur }: Props = $props();
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true,
		quality: "256"
	}));
</script>

<Layout {onclick} --w-base={"9.5em"} --img-h={"12.5em"} {mangaId}>
	{#if coverImage}
		<CoverImage {coverImage} {coverImageAlt} {blur} />
	{:else}
		<Skeleton width="var(--w-base)" height="var(--img-h)" />
	{/if}
	<Content {title} />
</Layout>
