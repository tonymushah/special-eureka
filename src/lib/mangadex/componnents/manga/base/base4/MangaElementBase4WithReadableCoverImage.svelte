<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import type { Readable } from "svelte/store";
	import Content from "./Content.svelte";
	import CoverImage from "./CoverImage.svelte";
	import Layout from "./Layout.svelte";
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
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		mangaId: string;
	}

	let { coverImage, coverImageAlt, title, mangaId, onclick }: Props = $props();
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout {onclick} --w-base={"9.5em"} --img-h={"12.5em"} {mangaId}>
	{#if $coverImage}
		<CoverImage coverImage={$coverImage} {coverImageAlt} />
	{:else}
		<Skeleton width={"var(--w-base)"} height={"var(--img-h)"} />
	{/if}
	<Content {title} />
</Layout>
