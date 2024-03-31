<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import type { Zoom } from "medium-zoom";
	import mediumZoom from "medium-zoom";
	import { onDestroy } from "svelte";
	import type { Readable } from "svelte/store";

	let isHovered = false;
	let coverImageInstance: HTMLImageElement | undefined = undefined;
	let zoom: Zoom | undefined = undefined;
	const theme = getMangaDexThemeContext();
	$: {
		zoom = mediumZoom(coverImageInstance, {
			background: `color-mix(in srgb, ${$theme.mainBackground} 80%, transparent)`
		});
	}
	onDestroy(() => {
		zoom?.close();
	});

	export let coverImage: Readable<string | undefined>;
	export let alt: string;
	export let title: string;
	$: src = $coverImage;
</script>

<div
	class="cover"
	on:mouseenter={() => {
		isHovered = true;
	}}
	role="button"
	tabindex="0"
	on:click={async () => {
		await zoom?.toggle();
	}}
	on:focusin={() => {
		isHovered = true;
	}}
	on:focusout={() => {
		isHovered = false;
	}}
	on:keydown={async ({ key }) => {
		if (key == "Enter") {
			await zoom?.toggle();
		}
	}}
	on:mouseleave={() => {
		isHovered = false;
	}}
>
	{#if src}
		<img {alt} {src} bind:this={coverImageInstance} />
	{:else}
		<Skeleton width={"var(--cover-w)"} height={"var(--cover-h)"} />
	{/if}
	<div class="title" class:isHovered>
		<h4>{title}</h4>
	</div>
</div>

<style lang="scss">
	:root {
		--cover-w: 11em;
		--cover-h: 16em;
	}
	.cover {
		width: var(--cover-w);
		height: var(--cover-h);
		border-radius: 0.25em;
		overflow: hidden;
		.title {
			width: var(--cover-w);
			height: 17em;
			display: flex;
			align-items: end;
			justify-content: center;
			position: relative;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent) 100%);
			top: -17em;
			h4 {
				color: var(--text-color);
			}
			transition: opacity 200ms ease-in-out;
			//animation: title-hovered-reverse 200ms ease-in-out;
			//animation-fill-mode: both;
		}
		.title.isHovered {
			opacity: 0;
			cursor: zoom-in;
			//animation: title-hovered 200ms ease-in-out;
			//animation-fill-mode: both;
		}
		img {
			width: var(--cover-w);
			height: var(--cover-h);
			border-radius: 0.25em;
			object-fit: cover;
		}
	}
	/*
	@keyframes title-hovered {
		0% {
			opacity: 1;
			display: auto;
		}
		50% {
			opacity: 0.5;
		}
		99% {
			opacity: 0.01;
		}
		100% {
			opacity: 0;
			display: none;
		}
	}
	@keyframes title-hovered-reverse {
		0% {
			opacity: 0;
			display: none;
		}
		1% {
			opacity: 0.01;
			display: auto;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
    */
</style>
