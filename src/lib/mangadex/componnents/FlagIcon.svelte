<script lang="ts">
	import { Language } from "@mangadex/gql/graphql";
	import "flag-icons/css/flag-icons.min.css";
	import { onMount } from "svelte";
	export let square = false;
	export let lang: Language;
	let lang_code: string;
	onMount(() => {
		switch (lang) {
			case Language.Albanian:
				lang_code = "al";
			case Language.Arabic:
				lang_code = "eh";
				break;
			case Language.Azerbaijani:
				lang_code = "az";
				break;
			case Language.Bengali:
				lang_code = "bd";
				break;
			case Language.Bulgarian:
				lang_code = "bg";
				break;
			case Language.Burmese:
				lang_code = "mm";
				break;
			case Language.Catalan:
				lang_code = "ad";
				break;
			case Language.ChineseRomanized:
				lang_code = "cn";
				break;
			case Language.ChineseSimplified:
				lang_code = "cn";
				break;
			case Language.ChineseTraditional:
				lang_code = "cn";
				break;
			case Language.Croatian:
				lang_code = "hr";
				break;
			case Language.Czech:
				lang_code = "cz";
				break;
			case Language.Danish:
				lang_code = "dk";
				break;
			case Language.Dutch:
				lang_code = "nl";
				break;
			case Language.English:
				lang_code = "gb";
				break;
			case Language.Esperanto:
			case Language.Estonian:
				lang_code = "ee";
				break;
			case Language.Filipino:
				lang_code = "ph";
				break;
			case Language.Finnish:
				lang_code = "fi";
				break;
			case Language.French:
				lang_code = "fr";
				break;
			case Language.Georgian:
				lang_code = "ge";
				break;
			case Language.German:
				lang_code = "de";
				break;
			case Language.Greek:
				lang_code = "gr";
				break;
			case Language.Hebrew:
				lang_code = "il";
				break;
			case Language.Hindi:
				lang_code = "in";
				break;
			case Language.Hungarian:
				lang_code = "hu";
				break;
			case Language.Indonesian:
				lang_code = "id";
				break;
			case Language.Italian:
				lang_code = "it";
				break;
			case Language.Japanese:
				lang_code = "jp";
				break;
			case Language.JapaneseRomanized:
				lang_code = "jp";
				break;
			case Language.Kazakh:
				lang_code = "kz";
				break;
			case Language.Korean:
				lang_code = "kr";
				break;
			case Language.KoreanRomanized:
				lang_code = "kr";
				break;
			case Language.Latin:

			case Language.Lithuanian:
				lang_code = "lt";
				break;
			case Language.Malagasy:
				lang_code = "mg";
				break;
			case Language.Malay:
				lang_code = "my";
				break;
			case Language.Mongolian:
				lang_code = "mn";
				break;
			case Language.Nepali:
				lang_code = "np";
				break;
			case Language.NiloSaharan:
				lang_code = "cf";
				break;
			case Language.Norwegian:
				lang_code = "no";
				break;
			case Language.Persian:
				lang_code = "ir";
				break;
			case Language.Polish:
				lang_code = "pl";
				break;
			case Language.PortugueseBrazilian:
				lang_code = "br";
				break;
			case Language.PortuguesePortugal:
				lang_code = "pt";
				break;
			case Language.Romanian:
				lang_code = "ro";
				break;
			case Language.Romansh:
				lang_code = "ch";
				break;
			case Language.Russian:
				lang_code = "ru";
				break;
			case Language.SerboCroatian:
				lang_code = "rs";
				break;
			case Language.Slovak:
				lang_code = "sk";
				break;
			case Language.SpanishCastilian:
				lang_code = "es";
				break;
			case Language.SpanishLatinAmerican:
				lang_code = "mx";
				break;
			case Language.Swedish:
				lang_code = "se";
				break;
			case Language.Tamil:
				lang_code = "lk";
				break;
			case Language.Telugu:
				lang_code = "in";
				break;
			case Language.Thai:
				lang_code = "th";
				break;
			case Language.Turkish:
				lang_code = "tr";
				break;
			case Language.Ukrainian:
				lang_code = "ua";
				break;
			case Language.Unknown:
			case Language.Vietnamese:
				lang_code = "vn";
				break;
			default:
				break;
		}
	});
	$: fis = square;
</script>

<span class={`fi fi-${lang_code}`} class:fis />
