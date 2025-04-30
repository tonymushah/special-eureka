<script lang="ts">
	import { type MangadexTheme } from "@mangadex/theme";
	import MangadexBackground from "./MangadexBackground.svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
	interface Props {
		theme: MangadexTheme;
		fonts?: string;
		children?: import("svelte").Snippet;
	}

	let { theme, fonts = "Poppins", children }: Props = $props();
</script>

<MangadexThemeProviderBase {theme} {fonts}>
	<MangadexBackground>
		{@render children?.()}
	</MangadexBackground>
</MangadexThemeProviderBase>
