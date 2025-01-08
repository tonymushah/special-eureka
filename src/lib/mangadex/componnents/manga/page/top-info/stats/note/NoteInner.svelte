<script lang="ts">
	import { run } from 'svelte/legacy';

	import { computePosition, flip } from "@floating-ui/dom";
	import type { TopMangaStatsInner } from "..";
	import DistributionItem from "./DistributionItem.svelte";

	interface Props {
		inner: TopMangaStatsInner;
		target: HTMLElement | undefined;
		isOpen?: boolean;
	}

	let { inner, target, isOpen = $bindable(false) }: Props = $props();

	let info: HTMLDivElement | undefined = $state();

	async function open() {
		if (target && info) {
			const { x: _x, y: _y } = await computePosition(target, info, {
				middleware: [flip()],
				placement: "bottom"
			});
			Object.assign(info.style, {
				top: `${_y}px`,
				left: `${_x}px`
			});
		}
	}
	run(() => {
		if (isOpen) {
			open().catch(() => {
				isOpen = false;
			});
		}
	});
	function getTotal(inner: TopMangaStatsInner) {
		return (
			inner[1] +
			inner[2] +
			inner[3] +
			inner[4] +
			inner[5] +
			inner[6] +
			inner[7] +
			inner[8] +
			inner[9] +
			inner[10]
		);
	}
	let total;
	run(() => {
		total = getTotal(inner);
	});
</script>

<div class="distribution-info" class:isOpen bind:this={info}>
	<DistributionItem bind:total distribution={10} value={inner[10]} />
	<DistributionItem bind:total distribution={9} value={inner[9]} />
	<DistributionItem bind:total distribution={8} value={inner[8]} />
	<DistributionItem bind:total distribution={7} value={inner[7]} />
	<DistributionItem bind:total distribution={6} value={inner[6]} />
	<DistributionItem bind:total distribution={5} value={inner[5]} />
	<DistributionItem bind:total distribution={4} value={inner[4]} />
	<DistributionItem bind:total distribution={3} value={inner[3]} />
	<DistributionItem bind:total distribution={2} value={inner[2]} />
	<DistributionItem bind:total distribution={1} value={inner[1]} />
</div>

<style lang="scss">
	.distribution-info {
		display: none;
		flex-direction: column;
		width: 16em;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: var(--accent-l1);
		padding: 0.5em;
		color: var(--text-color);
		border-radius: 0.25em;
		box-shadow: black 0px 0px 10px;
	}
	.distribution-info.isOpen {
		display: flex;
	}
</style>
