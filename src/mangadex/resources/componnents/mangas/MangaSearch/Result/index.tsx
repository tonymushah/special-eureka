import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import { useAtomValue } from "jotai";
import React from "react";
import { search_option_value } from "../atoms";
import { TagInsertionMode } from "../types";
import { Manga_Search_Result } from "./Manga_Search_Result";

export const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));

export default function MangaResult(){
    const search_option_atom_value = useAtomValue(search_option_value);
    const client = useHTTPClient();
    const search_option = React.useMemo<MangaSearch_withAllIncludes>(() => {
        const excludedTags: string[] = [];
            const includedTags: string[] = [];
            const status_: Array<string> = [];
            const content_rating_: Array<string> = [];
            search_option_atom_value.tags.forEach((d) => {
                if (d.mode == TagInsertionMode.Exclude) {
                    excludedTags.push(d.id);
                } else if (d.mode == TagInsertionMode.Include) {
                    includedTags.push(d.id);
                }
            });
            search_option_atom_value.status.forEach((d) => {
                if (d.include) {
                    status_.push(d.name);
                }
            });
            search_option_atom_value.content_rating.forEach((d) => {
                if (d.include) {
                    content_rating_.push(d.name);
                }
            });
        return {
            offset_Limits : search_option_atom_value.offset_limit,
            excludedTags,
            includedTags,
            status: status_,
            contentRating: content_rating_,
            title: search_option_atom_value.title,
            client
        };
    }, [search_option_atom_value, client]);
    return (
        <Manga_Search_Result {...search_option}/>
    );
}