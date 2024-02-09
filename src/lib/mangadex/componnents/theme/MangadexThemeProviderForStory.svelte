<script>
	import { custom } from "@mangadex/theme";
	import MangaDexThemeProvider from "./MangaDexThemeProvider.svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
    const theme = custom;
</script>

<MangadexThemeProviderBase {theme}>
    <slot/>
</MangadexThemeProviderBase>