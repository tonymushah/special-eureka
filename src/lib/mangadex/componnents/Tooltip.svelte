<script lang="ts">
	import { autoUpdate } from "@floating-ui/dom";
	import { computePosition, offset, flip, shift, arrow } from "@floating-ui/dom";
	import type { Snippet } from "svelte";

	let layout: HTMLElement | undefined = $state();
	let tooltip: HTMLDivElement | undefined = $state(undefined);
	let arrowElement: HTMLDivElement | undefined = $state(undefined);
	interface Props {
		open?: boolean;
		triggerContent: Snippet;
		tooltipContent: Snippet;
		openOnLayoutClick?: boolean;
	}

	let {
		open = $bindable(false),
		tooltipContent,
		triggerContent,
		openOnLayoutClick
	}: Props = $props();

	async function update() {
		if (layout && tooltip && arrowElement) {
			const { x, y, placement, middlewareData } = await computePosition(layout, tooltip, {
				placement: "bottom",
				middleware: [
					offset(6),
					flip(),
					shift({
						padding: 5
					}),
					arrow({
						element: arrowElement
					})
				]
			});
			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`
			});
			const arrow_ = middlewareData.arrow;
			if (arrow_) {
				const { x: arrowX, y: arrowY } = arrow_;
				const staticSide = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[placement.split("-")[0]];

				Object.assign(arrowElement.style, {
					left: arrowX != null ? `${arrowX}px` : "",
					top: arrowY != null ? `${arrowY}px` : "",
					right: "",
					bottom: "",
					[staticSide]: "-4px"
				});
			}
		}
	}
	function showTooltip() {
		if (tooltip) {
			tooltip.style.display = "block";
			update();
		}
	}

	function hideTooltip() {
		if (tooltip) {
			tooltip.style.display = "";
		}
	}
	$effect(() => {
		if (open == true) {
			showTooltip();
			if (layout && tooltip && arrowElement) {
				return autoUpdate(layout, tooltip, update);
			}
		} else {
			hideTooltip();
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<span
	bind:this={layout}
	tabindex="0"
	onclick={() => {
		if (openOnLayoutClick) {
			open = !open;
		}
	}}
>
	{@render triggerContent()}
</span>

<div class="tooltip" role="tooltip" bind:this={tooltip}>
	{@render tooltipContent()}
	<div class="arrow" bind:this={arrowElement}></div>
</div>
