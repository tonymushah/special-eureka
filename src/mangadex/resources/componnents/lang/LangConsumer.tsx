import Consumer from "@commons-res/components/Consumer";
import { Lang } from "@mangadex/api/internal/Utils";
import React from "react";
import { getAllLang } from "../../hooks/lang/getAllLang";

export default function LangConsumer(props: {
    children: (all_language: Lang[]) => React.ReactNode
}) {
    const { query } = getAllLang();
    if (query.isSuccess == true) {
        return (
            <Consumer<Lang[]> to_consume={query.data}>
                {
                    props.children
                }
            </Consumer>
        );
    } else {
        return (
            <></>
        );
    }
}