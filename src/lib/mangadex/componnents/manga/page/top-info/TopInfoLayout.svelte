<script lang="ts">
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { getTopCoverContextStore } from "./context";
	interface Props {
		cover?: import("svelte").Snippet;
		children?: import("svelte").Snippet;
	}

	let { cover, children }: Props = $props();

	const coverImageStore = getTopCoverContextStore();
	let coverImage = $derived($coverImageStore ?? "");
</script>

<article
	class="layout-image"
	style={`background-image: url(${coverImage});`}
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
	}
	@media (width >= 900px) {
		.layout {
			grid-template-columns: repeat(4, 1fr);
			.cover {
				grid-column: 0 / 4;
				grid-row: 1;
				display: flex;
				align-self: center;
				justify-content: center;
				margin: 2em;
			}
			.content {
				grid-column: 2 / -1;
				grid-row: 1;
			}
		}
	}
	@media (width < 900px) {
		.layout {
			grid-template-columns: 35% auto;
		}
	}
</style>
