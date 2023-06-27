import { Lang, get_random_lang_data } from "@mangadex/api/internal/Utils";
import { LocalizedString } from "@mangadex/api/sta/data-contracts";
import React from "react";

export function useLocalisedStringData({src, lang} : {
    src : LocalizedString,
    lang? : Lang | string,
}){
    return React.useMemo(() => {
        if(typeof lang == "string"){
            return src[lang];
        }else if(typeof lang == "object" && lang instanceof Lang){
            return src[lang.get_two_letter()];
        }else{
            return get_random_lang_data(src);
        }
    }, [src, lang]);
}

export default function Localized_String_Display(props : {
    src : LocalizedString
}){
    return (
        <React.Fragment/>
    );
}