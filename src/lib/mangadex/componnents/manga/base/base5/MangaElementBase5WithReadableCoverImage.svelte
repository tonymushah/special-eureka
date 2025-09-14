<script lang="ts">
	import Content from "./Content.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import Layout from "./Layout.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";

	interface Events {
		onreadClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		onmoreInfoClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}

	interface Props extends Events {
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		description: string;
		mangaId: string;
		blur?: boolean;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		description,
		mangaId,
		onmoreInfoClick,
		onreadClick,
		blur
	}: Props = $props();
	let isHover = $state(false);
	let image = $derived($coverImage);
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout bind:isHover {mangaId}>
	{#if image}
		<img src={image} alt={coverImageAlt} class:blur />
	{:else}
		<Skeleton height={"var(--s-h)"} width={"var(--s-w)"} />
	{/if}
	<Content {title} {description} {isHover} {onmoreInfoClick} {onreadClick} />
</Layout>

<style lang="scss">
	:root {
		--transition-duration: 500ms;
		--transition-timing-function: ease-in-out;
		--width: 16em;
		--height: 23em;
		--height-c: 24em;
		--s-w: var(--width);
		--s-h: var(--height);
	}
	img {
		width: var(--width);
		height: var(--height);
		object-fit: cover;
		border-radius: 0.25rem;
	}
	img {
		transition: filter 100ms ease-in-out;
	}
	img.blur {
		filter: blur(10px);
	}
	img.blur:hover {
		filter: blur(5px);
	}
</style>
