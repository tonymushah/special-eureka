import { Chapter } from "@mangadex/api/structures/Chapter";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function get_this_chapter_lang(props: {
    chapter: Chapter;
}) {
    // [x] Refactor query key into a new function
    const this_chapter_lang_querykey = React.useMemo(() => queryKey(props), []);
    const this_chapter_lang_query = useQuery(this_chapter_lang_querykey, () => {
        return props.chapter.get_translated_Lang();
    }, {
        cacheTime: 1000 * 60
    });
    return {
        this_chapter_lang_query,
        this_chapter_lang_querykey
    };
}

export function queryKey(props: { chapter: Chapter; }) {
    return ["mdx", "chapter", props.chapter.get_id(), "lang"];
}