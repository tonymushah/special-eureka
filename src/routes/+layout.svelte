<script lang="ts">
	import { goto } from "$app/navigation";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { appWindow } from "@tauri-apps/api/window";
	import { onDestroy, onMount } from "svelte";
	// import function to register Swiper custom elements
	import { register } from "swiper/element/bundle";
	// register Swiper custom elements

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

<slot />

<style>
	:global(body) {
		margin: 0px;
	}
</style>
