import { Chapter } from "@mangadex/api/structures/Chapter";
import { useQuery } from "@tanstack/react-query";


export function get_this_chapter_lang(props: {
    chapter: Chapter;
}) {
    // [ ] Refactor query key into a new function
    const this_chapter_lang_querykey = ["mdx", "chapter", props.chapter.get_id(), "lang"];
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
