<script lang="ts">
	import { goto } from "$app/navigation";
	import WindowDecoration from "$lib/window-decoration/WindowDecoration.svelte";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
	import { onDestroy, onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { register } from "swiper/element/bundle";
	import "toastify-js/src/toastify.css";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
	const appWindow = getCurrentWebviewWindow();
	let decorationHeigth: number | undefined = $state(undefined);
	const unlistens: UnlistenFn[] = [];
	onMount(async () => {
		register();
		unlistens.push(
			await appWindow.listen<string>("redirect", ({ payload }) => {
				goto(payload);
			})
		);
	});
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	let decoHg = $derived(decorationHeigth ?? 0);
</script>

<div
	class="outer rem0asd"
	class:defaultDecoration={$isDefaultDecoration}
	style="--decoH: {decoHg}px"
>
	{#if !$isDefaultDecoration}
		<div
			class="decoration"
			transition:slide={{
				axis: "y"
			}}
			bind:clientHeight={decorationHeigth}
		>
			<WindowDecoration />
		</div>
	{/if}
	<div class="inner redad">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.outer {
		width: 100vw;
		height: 100cqh;
		display: grid;
		grid-template-areas:
			"decoration"
			"content";
		grid-template-rows: auto 1fr;
		.decoration {
			grid-area: decoration;
		}
		.inner {
			grid-area: content;
			overflow-x: hidden;
			//height: 100%;
		}
	}
	:global(body) {
		margin: 0px;
	}
</style>
