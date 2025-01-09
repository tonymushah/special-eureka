<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { ChevronUpIcon } from "svelte-feather-icons";
	import { fade, slide } from "svelte/transition";
	import HeaderChevronBase from "../header/HeaderChevronBase.svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import { autoPlacement, autoUpdate, computePosition, offset } from "@floating-ui/dom";
	import { noop } from "lodash";
	import { onDestroy } from "svelte";
	import CollapsedProvider from "./CollapsedProvider.svelte";
	let buttonRef: HTMLDivElement | undefined = $state(undefined);
	let floatingRef: HTMLDivElement | undefined = $state(undefined);
	let cleanup: () => void = $state(noop);
	$effect(() => {
		if (buttonRef != undefined && floatingRef != undefined) {
			cleanup = autoUpdate(buttonRef, floatingRef, () => {
				if (buttonRef != undefined && floatingRef != undefined) {
					const middleware = [autoPlacement(), offset(10)];
					computePosition(buttonRef, floatingRef, {
						placement: "left",
						middleware
					}).then(({ x, y, middlewareData }) => {
						if (floatingRef != undefined) {
							Object.assign(floatingRef.style, {
								left: `${x}px`,
								top: `${y}px`
							});
						}
					});
				}
			});
		}
	});
	interface Props {
		label: string;
		icon?: import("svelte").Snippet;
		children?: import("svelte").Snippet;
	}

	let { label, icon, children }: Props = $props();
	let collapsed = $derived($isOpen);

	let isMenuOpen = $state(false);
	$effect(() => {
		if (!isMenuOpen && collapsed) {
			cleanup();
		}
	});
	onDestroy(() => {
		cleanup();
	});

	const icon_render = $derived(icon);
</script>

<div class="outer">
	<div
		role="button"
		tabindex="0"
		bind:this={buttonRef}
		onkeypress={() => {
			isMenuOpen = !isMenuOpen;
		}}
		onclick={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		<MenuBase {collapsed}>
			<MenuIcons>
				{#snippet icon()}
					<div class="icon" class:collapsed>
						{@render icon_render?.()}
					</div>
				{/snippet}
				<!-- TODO @migration-task: migrate this slot by hand, `suffix-icon` is an invalid identifier -->
				{#snippet suffixIcon()}
					<div class="suffix-icon" class:collapsed class:isMenuOpen>
						{#if collapsed}
							<HeaderChevronBase size="16" />
						{:else}
							<ChevronUpIcon size="24" />
						{/if}
					</div>
				{/snippet}

				<MenuLabel {label} {collapsed} />
			</MenuIcons>
		</MenuBase>
	</div>

	{#if isMenuOpen && !collapsed}
		<div class="body" transition:slide>
			{@render children?.()}
		</div>
	{/if}
</div>

{#if isMenuOpen && collapsed}
	<div class="collapsed-body" transition:fade bind:this={floatingRef}>
		<div class="content">
			<CollapsedProvider>
				{@render children?.()}
			</CollapsedProvider>
		</div>
	</div>
{/if}

<style lang="scss">
	div {
		color: var(--text-color);
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.icon.collapsed {
		padding-left: 16px;
	}
	.suffix-icon {
		transition: rotate 200ms ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.suffix-icon:not(.collapsed) {
		margin-left: 12px;
		margin-right: 12px;
	}
	.suffix-icon.isMenuOpen {
		rotate: 180deg;
	}
	.body {
		overflow: hidden;
	}
	.collapsed-body {
		position: absolute;
		top: 0;
		left: 0;
		gap: 12px;
		.content {
			background-color: var(--accent-l1);
			padding-right: 5px;
			border-radius: 3px;
			min-width: 125px;
			border: solid var(--mid-tone) 2px;
			box-shadow: 0px 3px 3px var(--mid-tone);
		}
		z-index: 10;
	}
</style>
