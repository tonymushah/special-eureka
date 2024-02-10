<script lang="ts">
	import { type MangadexTheme } from "@mangadex/theme";
	import MangadexBackground from "./MangadexBackground.svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";

	export let theme: MangadexTheme;
	export let fonts = "Poppins";
</script>

<MangadexThemeProviderBase {theme} {fonts}>
	<MangadexBackground>
		<slot />
	</MangadexBackground>
</MangadexThemeProviderBase>
