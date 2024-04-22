<script lang="ts">
	import { style, fonts } from "$lib/window-decoration/WindowDecoration.svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { getMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { onDestroy, onMount } from "svelte";

	const theme = getMangaDexThemeContext();
	const fontsStore = getMangaDexFontsContext();
	let unlistens: UnlistenFn[] = [];
	onMount(() => {
		unlistens.push(
			theme.subscribe((t) => {
				style.set({
					textColor: t.textColor,
					background: t.accents.default.default,
					backgroundOnHover: t.accents.default.hover,
					minBackground: t.accents.l2,
					maxBackground: t.accents.l2,
					closeBackground: {
						default: t.danger.default,
						hover: `color-mix(in srgb, ${t.danger.l1} 50%, ${t.mainBackground} 50%)`,
						active: `color-mix(in srgb, ${t.danger.l2} 50%, ${t.mainBackground} 50%)`
					},
					menuBackground: {
						default: t.button.default,
						hover: t.primary.primary,
						active: t.primary.primary2
					}
				});
			})
		);
		unlistens.push(
			fontsStore.subscribe((f) => {
				fonts.set(f);
			})
		);
	});
	onDestroy(() => {
		unlistens.forEach((u) => u);
	});
</script>
