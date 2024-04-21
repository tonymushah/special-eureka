<script lang="ts">
	import { style } from "$lib/window-decoration/WindowDecoration.svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { onMount } from "svelte";

	const theme = getMangaDexThemeContext();
	onMount(() => {
		return theme.subscribe((t) => {
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
				menuBackground: t.accents.l1
			});
		});
	});
</script>
