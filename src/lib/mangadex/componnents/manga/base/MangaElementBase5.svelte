<script lang="ts">
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import Content from "./base5/Content.svelte";
	import Layout from "./base5/Layout.svelte";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

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
		coverImageAlt: string;
		title: string;
		description: string;
		mangaId: string;
		blur?: boolean;
	}

	let { coverImageAlt, title, description, mangaId, onmoreInfoClick, onreadClick, blur }: Props =
		$props();
	let isHover = $state(false);
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));

	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true,
		quality: "256"
	}));
</script>

<Layout bind:isHover {mangaId}>
	{#if coverImage.value}
		<img src={coverImage.value} alt={coverImageAlt} class:blur />
	{:else}
		<Skeleton width="var(--width)" height="var(--height)" />
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
