<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { children, mangaId, onclick }: Props = $props();
</script>

<!-- TODO Remove <ButtonBase/> for layout -->
<ButtonBase
	{onclick}
	isBase={false}
	with_hover
	noPadding
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l-active)"}
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true
	})}
>
	<article class="layout manga-element" data-manga-id={mangaId}>
		{@render children?.()}
	</article>
</ButtonBase>

<style lang="scss">
	.layout {
		width: var(--element-w);
		height: var(--element-h);
		overflow: hidden;
		border-radius: 0.25rem;
	}
	.manga-element:global([data-selecto-selected]) {
		--content-bg: color-mix(in srgb, var(--primary) 75%, var(--accent-l3) 25%);
	}
	.manga-element:global(:not([data-selecto-selected])) {
		--content-bg: var(--accent-l3);
	}
</style>
