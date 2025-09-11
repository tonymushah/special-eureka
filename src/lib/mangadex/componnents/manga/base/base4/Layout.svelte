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

<ButtonBase
	{onclick}
	isBase={false}
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true
	})}
	noPadding
	--button-color={"var(--main-background)"}
>
	<article class="layout manga-element" data-manga-id={mangaId}>
		{@render children?.()}
	</article>
</ButtonBase>

<style lang="scss">
	.layout {
		width: var(--w-base);
		overflow: hidden;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
