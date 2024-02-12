<script>
	import { custom } from "@mangadex/theme";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
    const theme = custom;
</script>

<MangadexThemeProviderBase {theme}>
    <slot/>
</MangadexThemeProviderBase>