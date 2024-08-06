<script lang="ts">
	import { Language } from "@mangadex/gql/graphql";
	import language_to_flag_icon from "@mangadex/utils/lang/language_to_flag_icon";
	import "flag-icons/sass/flag-icons.scss";
	import { onMount } from "svelte";
	export let square = false;
	export let lang: Language;
	$: lang_code = language_to_flag_icon(lang);
	$: fis = square;
</script>

<span class={`fi fi-${lang_code}`} class:fis />
