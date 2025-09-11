<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import Content from "./base1/Content.svelte";
	import Image from "./base1/Image.svelte";
	import Layout from "./base1/Layout.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
		coverImage: string;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		withFull?: boolean;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		withFull = false,
		mangaId,
		onclick
	}: Props = $props();
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout {onclick} --layout-width={withFull ? "100%" : "19em"} {mangaId}>
	<Image {coverImage} {coverImageAlt} />
	<Content {title} {status} {description} />
</Layout>
