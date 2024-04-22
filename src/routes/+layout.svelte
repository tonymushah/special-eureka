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
		width: 100%;
		height: 100cqh;
		overflow: hidden;
		.inner {
			height: 100cqh;
		}
	}
	.outer.defaultDecoration {
		height: 100vh;
	}
	:global(body) {
		margin: 0px;
	}
</style>
