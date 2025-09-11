<script lang="ts">
	import Content from "./base3/Content.svelte";
	import Layout from "./base3/Layout.svelte";
	import Image from "./base3/Image.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
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
		mangaId: string;
	}

	let { coverImage, coverImageAlt, title, mangaId, onclick }: Props = $props();
	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: mangaId,
			coverArtId: mangaId
		})
	);
</script>

<Layout --element-w="10em" {onclick} --element-h="15em" {mangaId}>
	<Image {coverImage} {coverImageAlt} />
	<Content {title} />
</Layout>
