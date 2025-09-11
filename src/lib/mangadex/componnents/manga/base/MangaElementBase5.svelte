<script lang="ts">
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import Content from "./base5/Content.svelte";
	import Layout from "./base5/Layout.svelte";
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
		coverImage: string;
		coverImageAlt: string;
		title: string;
		description: string;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		description,
		mangaId,
		onmoreInfoClick,
		onreadClick
	}: Props = $props();
	let isHover = $state(false);
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

<Layout bind:isHover {mangaId}>
	<img src={coverImage} alt={coverImageAlt} />
	<Content {title} {description} {isHover} {onmoreInfoClick} {onreadClick} />
</Layout>

<style lang="scss">
	:root {
		--transition-duration: 500ms;
		--transition-timing-function: ease-in-out;
		--width: 16em;
		--height: 23em;
		--height-c: 24em;
	}
	img {
		width: var(--width);
		height: var(--height);
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
