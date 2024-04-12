<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import type { UnlistenFn } from "@tauri-apps/api/event";
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
	export let fixedWidth: boolean = true;
	export let alt: string;
	export let title: string;
	$: src = $coverImage;
	let container: HTMLDivElement | undefined = undefined;
	let sW = "var(--cover-w)";
	let sH = "var(--cover-h)";
	let skR: UnlistenFn = () => {};
	$: isImageLoaded = src != undefined;

	$: {
		if (fixedWidth == false && container != undefined) {
			skR();
			let e = () => {
				sW = "100cqw";
				sH = `50cqh`;
			};
			e();
			window.addEventListener("resize", e);
			skR = () => {
				window.removeEventListener("resize", e);
			};
		} else {
			skR();
			sW = "var(--cover-w)";
			sH = "var(--cover-h)";
		}
	}
	onDestroy(() => {
		skR();
	});
</script>

<div
	class="cover"
	on:mouseenter={() => {
		isHovered = true;
	}}
	role="button"
	tabindex="0"
	class:fixedWidth
	class:isHovered
	class:isImageLoaded
	data-title={title}
	bind:this={container}
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
		<Skeleton bind:width={sW} bind:height={sH} />
	{/if}
	{#if fixedWidth}
		<div class="title" class:isHovered>
			<h4>{title}</h4>
		</div>
	{/if}
</div>

<style lang="scss">
	:root {
		--cover-w: 11em;
		--cover-h: 16em;
	}
	.cover:not(.fixedWidth) {
		width: 100%;
		height: 50%;
		overflow: hidden;
		height: 50cqh;
		.title {
			top: 0px;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent) 100%);
		}
		img {
			width: 100%;
			height: 50cqh;
			object-fit: cover;
		}
	}
	.cover.isImageLoaded:not(.fixedWidth)::after {
		top: -51cqh;
	}
	.cover:not(.fixedWidth)::after {
		transition: opacity 200ms ease-in-out;
		content: attr(data-title);
		width: 100%;
		display: flex;
		color: var(--text-color);
		justify-content: center;
		position: relative;
		align-items: end;
		height: 50cqh;
		top: -50cqh;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent) 100%);
		font-weight: 800;
		font-size: 16px;
	}
	.cover.isHovered:not(.fixedWidth)::after {
		opacity: 0;
	}
	.cover.fixedWidth::after {
		display: none;
	}
	.cover.fixedWidth {
		width: var(--cover-w);
		height: var(--cover-h);
		.title {
			width: var(--cover-w);
			height: 17em;
			top: -17em;
			position: relative;
		}
		img {
			width: var(--cover-w);
			height: var(--cover-h);
		}
	}
	.cover {
		border-radius: 0.25em;
		overflow: hidden;
		.title {
			display: flex;
			align-items: end;
			justify-content: center;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent) 100%);
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
			border-radius: 0.25em;
			image-rendering: optimizeSpeed;
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
