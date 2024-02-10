<script lang="ts">
	import { buildSvelteUITheme, type MangadexTheme } from "@mangadex/theme";
	import SomeDiv from "./SomeDiv.svelte";
	import { SvelteUIProvider } from "@svelteuidev/core";

	export let theme: MangadexTheme;
	export let fonts = "Poppins";
	$: svelte_ui_theme = buildSvelteUITheme(theme);
</script>

<SomeDiv
	--font-size={"16px"}
	--fonts={fonts}
	--text-color={theme.textColor}
	--main-background={theme.mainBackground}
	--accent={theme.accents.default.default}
	--accent-hover={theme.accents.default.hover}
	--accent-active={theme.accents.default.active}
	--accent-l1={theme.accents.l1.default}
	--accent-l1-hover={theme.accents.l1.hover}
	--accent-l1-active={theme.accents.l1.default}
	--accent-l2={theme.accents.l2.default}
	--accent-l2-hover={theme.accents.l2.hover}
	--accent-l2-active={theme.accents.l2.default}
	--accent-l3={theme.accents.l3.default}
	--accent-l3-hover={theme.accents.l3.hover}
	--accent-l3-active={theme.accents.l3.default}
	--accent-l4={theme.accents.l4.default}
	--accent-l4-hover={theme.accents.l4.hover}
	--accent-l4-active={theme.accents.l4.default}
	--accent-l5={theme.accents.l5.default}
	--accent-l5-hover={theme.accents.l5.hover}
	--accent-l5-active={theme.accents.l5.default}
	--mid-tone={theme.mid_tone}
	--contrast-l1={theme.contrast.l1}
	--scrollbar-color={theme.scrollbar.default}
	--scrollbar-color-hover={theme.scrollbar.default}
	--button-accent={theme.button.default}
	--button-accent-alt={theme.button.alternate}
	--primary={theme.primary.primary}
	--primary-l1={theme.primary.primary1}
	--primary-l2={theme.primary.primary2}
	--status-red={theme.status.red}
	--status-green={theme.status.green}
	--status-yellow={theme.status.yellow}
	--status-blue={theme.status.blue}
	--status-gray={theme.status.grey}
	--status-purple={theme.status.purple}
	--indication-blue={theme.indication.blue}
	--danger={theme.danger.default}
	--danger-l1={theme.danger.l1}
	--danger-l2={theme.danger.l2}
>
	<SvelteUIProvider bind:class={svelte_ui_theme}>
		<slot />
	</SvelteUIProvider>
</SomeDiv>
