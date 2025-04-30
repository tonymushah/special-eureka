<script lang="ts" module>
	export const headerHeight = writable<number>(0);
</script>

<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { MenuIcon } from "svelte-feather-icons";
	import { writable } from "svelte/store";
	import { getCurrentChapterData } from "../contexts/currentChapter";
	import ChapterPageHeaderCurrentPage from "./currentPage/ChapterPageHeaderCurrentPage.svelte";
	import TopContent from "./TopContent.svelte";

	const current = getCurrentChapterData();
	interface Events {
		onmenuClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
		onmenuPress?: (
			ev: KeyboardEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
	}
	interface Props extends Events {}
	let { onmenuClick, onmenuPress }: Props = $props();
	let headerEl: HTMLElement | undefined = $state();
	onMount(() => {
		const h = headerEl?.clientHeight;
		if (h) {
			headerHeight.set(h);
		}
	});
	onDestroy(() => {
		headerHeight.set(0);
	});
</script>

<header bind:this={headerEl}>
	<TopContent />
	<section class="buttons">
		<div>
			{#if $current.volume != undefined && $current.chapterNumber != undefined}
				Volume {$current.volume} - Chapter {$current.chapterNumber}
			{:else if $current.chapterNumber != undefined}
				Chapter {$current.chapterNumber}
			{:else if $current.isOneshot}
				Oneshot
			{:else}
				??
			{/if}
		</div>
		<div>
			<ChapterPageHeaderCurrentPage />
		</div>
		<div
			class="menu-button"
			tabindex="0"
			role="button"
			onclick={(e) => {
				onmenuClick?.(e);
			}}
			onkeydown={(e) => {
				onmenuPress?.(e);
			}}
		>
			<MenuIcon /> Menu
		</div>
	</section>
</header>

<style lang="scss">
	header {
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-style: solid;
		border-top-width: 0px;
		border-left-width: 0px;
		border-right-width: 0px;
		border-bottom-width: 1px;
		border-color: var(--mid-tone);
		padding-bottom: 10px;
	}
	section {
		font-weight: 600;
	}
	section.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 10px;
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--accent-l3);
			padding: 1px;
		}
	}
	.menu-button {
		gap: 5px;
		transition: background-color 200ms ease-in-out;
	}
	.menu-button:hover {
		background-color: var(--accent-l3-hover);
	}
	.menu-button:active {
		background-color: var(--accent-l3-active);
	}
</style>
