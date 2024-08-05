<script lang="ts">
	import { goto } from "$app/navigation";
	import WindowDecoration from "$lib/window-decoration/WindowDecoration.svelte";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { appWindow } from "@tauri-apps/api/window";
	import { onDestroy, onMount } from "svelte";
	import { slide } from "svelte/transition";
	import { register } from "swiper/element/bundle";
	import "toastify-js/src/toastify.css";

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
</script>

<div class="outer" class:defaultDecoration={$isDefaultDecoration}>
	{#if !$isDefaultDecoration}
		<div
			class="decoration"
			transition:slide={{
				axis: "y"
			}}
		>
			<WindowDecoration />
		</div>
	{/if}
	<div class="inner">
		<slot />
	</div>
</div>

<style lang="scss">
	.outer {
		width: 100vw;
		height: 96vh;
		display: grid;
		grid-template-areas:
			"decoration decoration decoration"
			"content content content"
			"content content content"
			"content content content";
		.decoration {
			grid-area: decoration;
		}
		.inner {
			grid-area: content;
		}
	}
	.outer.defaultDecoration {
		height: 100cqh;
	}
	:global(body) {
		margin: 0px;
	}
</style>
