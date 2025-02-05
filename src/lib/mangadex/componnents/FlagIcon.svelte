<script lang="ts">
	import { Language } from "@mangadex/gql/graphql";
	import language_to_flag_icon from "@mangadex/utils/lang/language_to_flag_icon";
	import "flag-icons/sass/flag-icons.scss";
	import { onMount } from "svelte";
	interface Props {
		square?: boolean;
		lang: Language;
	}

	let { square = false, lang = $bindable() }: Props = $props();
	let lang_code = $derived(language_to_flag_icon(lang));
	let fis = $derived(square);
</script>

<span class={`fi fi-${lang_code}`} class:fis></span>
