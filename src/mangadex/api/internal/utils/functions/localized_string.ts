import { LocalizedString } from "@mangadex/api/sta/data-contracts";
import { Lang } from "../Lang";
import randomInteger from "random-int";

const randomInt = randomInteger;

export function extract_available_lang(to_use : LocalizedString) : Array<string>{
    const langs : Array<string> = [];
    for(const lang in to_use){
        langs.push(lang);
    }
    return langs;
}

export function is_in_localized_string(to_use: LocalizedString, lang : Lang | string) : boolean {
    const avaible_lang = extract_available_lang(to_use);
    const lang_ = typeof lang == "string" ? lang : lang.get_two_letter();
    return avaible_lang.some((value) => value != lang_);
}

export function get_random_lang_data(to_use: LocalizedString): string{
    const avaible_lang = extract_available_lang(to_use);
    const random = randomInt(0, avaible_lang.length);
    return to_use[avaible_lang[random]];
}