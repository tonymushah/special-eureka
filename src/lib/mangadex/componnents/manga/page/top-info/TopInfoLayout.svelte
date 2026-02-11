<script lang="ts">
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { getTopMangaIdContextStore } from "./context";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	interface Props {
		cover?: import("svelte").Snippet;
		children?: import("svelte").Snippet;
	}

	let { cover, children }: Props = $props();
	const mangaId = getTopMangaIdContextStore();
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true
	}));
</script>

<article
	class="layout-image"
	style={`background-image: url(${coverImage.value});`}
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true
	})}
>
	<div class="layout-color">
		<div class="layout">
			<div class="cover">
				{@render cover?.()}
			</div>
			<div class="content">
				{@render children?.()}
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";
	.layout-image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -200px;
		color: var(--text-color);
	}
	.layout-color {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--main-background) 30%, transparent),
			color-mix(in srgb, var(--main-background) 80%, transparent),
			color-mix(in srgb, var(--main-background) 100%, transparent)
		);
	}
	.layout {
		display: grid;
		margin: var(--manga-page-layout-margin);
		padding: var(--manga-page-layout-padding);
		gap: 10px;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		grid-template-areas: "cover content";
		.cover {
			grid-area: cover;
			display: flex;
			align-self: center;
			justify-content: center;
			margin: 2em;
		}
		.content {
			grid-area: content;
		}
	}
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "lg")) {
		.layout {
			grid-template-columns: 35% auto;
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "lg")) {
		.layout {
			grid-template-columns: 275px auto;
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xxl")) {
		.layout {
			grid-template-columns: 300px auto;
		}
	}
</style>
