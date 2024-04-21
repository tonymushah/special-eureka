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
				backgroundOnHover: t.accents.default.hover
			});
		});
	});
</script>
