import { Language } from "@mangadex/gql/graphql";

export default function language_to_flag_icon(lang: Language): string | undefined {
	switch (lang) {
		case Language.Albanian:
			return "al";
		case Language.Arabic:
			return "eh";

		case Language.Azerbaijani:
			return "az";

		case Language.Bengali:
			return "bd";

		case Language.Bulgarian:
			return "bg";

		case Language.Burmese:
			return "mm";

		case Language.Catalan:
			return "ad";

		case Language.ChineseRomanized:
			return "cn";

		case Language.ChineseSimplified:
			return "cn";

		case Language.ChineseTraditional:
			return "cn";

		case Language.Croatian:
			return "hr";

		case Language.Czech:
			return "cz";

		case Language.Danish:
			return "dk";

		case Language.Dutch:
			return "nl";

		case Language.English:
			return "gb";

		case Language.Esperanto:
		case Language.Estonian:
			return "ee";

		case Language.Filipino:
			return "ph";

		case Language.Finnish:
			return "fi";

		case Language.French:
			return "fr";

		case Language.Georgian:
			return "ge";

		case Language.German:
			return "de";

		case Language.Greek:
			return "gr";

		case Language.Hebrew:
			return "il";

		case Language.Hindi:
			return "in";

		case Language.Hungarian:
			return "hu";

		case Language.Indonesian:
			return "id";

		case Language.Italian:
			return "it";

		case Language.Japanese:
			return "jp";

		case Language.JapaneseRomanized:
			return "jp";

		case Language.Kazakh:
			return "kz";

		case Language.Korean:
			return "kr";

		case Language.KoreanRomanized:
			return "kr";

		case Language.Latin:
			break;
		case Language.Lithuanian:
			return "lt";
		case Language.Malagasy:
			return "mg";

		case Language.Malay:
			return "my";

		case Language.Mongolian:
			return "mn";

		case Language.Nepali:
			return "np";

		case Language.NiloSaharan:
			return "cf";

		case Language.Norwegian:
			return "no";

		case Language.Persian:
			return "ir";

		case Language.Polish:
			return "pl";

		case Language.PortugueseBrazilian:
			return "br";

		case Language.PortuguesePortugal:
			return "pt";

		case Language.Romanian:
			return "ro";

		case Language.Romansh:
			return "ch";

		case Language.Russian:
			return "ru";

		case Language.SerboCroatian:
			return "rs";

		case Language.Slovak:
			return "sk";

		case Language.SpanishCastilian:
			return "es";

		case Language.SpanishLatinAmerican:
			return "mx";

		case Language.Swedish:
			return "se";

		case Language.Tamil:
			return "lk";

		case Language.Telugu:
			return "in";

		case Language.Thai:
			return "th";

		case Language.Turkish:
			return "tr";

		case Language.Ukrainian:
			return "ua";

		case Language.Unknown:
		case Language.Vietnamese:
			return "vn";

		default:
	}
}
