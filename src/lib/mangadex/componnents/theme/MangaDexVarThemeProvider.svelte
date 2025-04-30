<script lang="ts">
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";

	import SomeDiv from "./SomeDiv.svelte";
	import ButtonFlexContentProvider from "./buttons/ButtonFlexContentProvider.svelte";
	import { custom } from "@mangadex/theme";
	import { derived } from "svelte/store";
	const theme_store_ = getMangaDexThemeContext();
	const theme_store = derived([theme_store_], ([$t]) => $t ?? custom);
	interface Props {
		fonts?: string;
		children?: import("svelte").Snippet;
	}

	let { fonts = "Poppins", children }: Props = $props();
</script>

<SomeDiv
	--font-size={"16px"}
	--fonts={fonts}
	--text-color={$theme_store.textColor}
	--main-background={$theme_store.mainBackground}
	--accent={$theme_store.accents.default.default}
	--accent-hover={$theme_store.accents.default.hover}
	--accent-active={$theme_store.accents.default.active}
	--accent-l1={$theme_store.accents.l1.default}
	--accent-l1-hover={$theme_store.accents.l1.hover}
	--accent-l1-active={$theme_store.accents.l1.active}
	--accent-l2={$theme_store.accents.l2.default}
	--accent-l2-hover={$theme_store.accents.l2.hover}
	--accent-l2-active={$theme_store.accents.l2.active}
	--accent-l3={$theme_store.accents.l3.default}
	--accent-l3-hover={$theme_store.accents.l3.hover}
	--accent-l3-active={$theme_store.accents.l3.active}
	--accent-l4={$theme_store.accents.l4.default}
	--accent-l4-hover={$theme_store.accents.l4.hover}
	--accent-l4-active={$theme_store.accents.l4.active}
	--accent-l5={$theme_store.accents.l5.default}
	--accent-l5-hover={$theme_store.accents.l5.hover}
	--accent-l5-active={$theme_store.accents.l5.active}
	--mid-tone={$theme_store.mid_tone}
	--contrast-l1={$theme_store.contrast.l1}
	--scrollbar-color={$theme_store.scrollbar.default}
	--scrollbar-color-hover={$theme_store.scrollbar.hovered}
	--button-accent={$theme_store.button.default}
	--button-accent-alt={$theme_store.button.alternate}
	--primary={$theme_store.primary.primary}
	--primary-l1={$theme_store.primary.primary1}
	--primary-l2={$theme_store.primary.primary2}
	--status-red={$theme_store.status.red}
	--status-green={$theme_store.status.green}
	--status-yellow={$theme_store.status.yellow}
	--status-blue={$theme_store.status.blue}
	--status-gray={$theme_store.status.grey}
	--status-purple={$theme_store.status.purple}
	--indication-blue={$theme_store.indication.blue}
	--danger={$theme_store.danger.default}
	--danger-l1={$theme_store.danger.l1}
	--danger-l2={$theme_store.danger.l2}
	--tag-padding={"2px 6px"}
	--tag-font-size={"12px"}
	--tag-font-weight={"600"}
	--context-menu-font-size="14px"
>
	<ButtonFlexContentProvider>
		{@render children?.()}
	</ButtonFlexContentProvider>
</SomeDiv>
