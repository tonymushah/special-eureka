<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import type { Readable } from "svelte/store";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
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
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		mangaId: string;
		blur?: boolean;
	}

	let { coverImage, coverImageAlt, title, mangaId, onclick, blur }: Props = $props();
	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: mangaId,
			coverArtId: mangaId
		})
	);
</script>

<Layout --element-w="10em" --element-h="15em" {onclick} {mangaId}>
	{#if $coverImage}
		<Image coverImage={$coverImage} {coverImageAlt} {blur} />
	{:else}
		<Skeleton width={"var(--element-w)"} height={"var(--element-h)"} />
	{/if}
	<Content {title} />
</Layout>
