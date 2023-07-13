import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import { Mangadex_suspense__ } from "@mangadex/index";
import { useAtomValue } from "jotai";
import React from "react";
import CollectionComponnent_WithQuery from "../../Collection/CollectionComponnent_WithQuery";
import MyErrorBounderies from "../../error/MyErrorBounderies";
import { search_option_value } from "./atoms";
import { TagInsertionMode } from "./types";

const MangaList = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaList"));


function Manga_Search_Result(props: MangaSearch_withAllIncludes) {
    return (
        <MyErrorBounderies>
            <CollectionComponnent_WithQuery<Manga>
                queryKey={["mdx", "manga", "search", `${Math.random() * 100}`]}
                fn={async () => {
                    return await Manga_with_allRelationship.search(props);
                }}
            >
                {
                    (collec) => (
                        <React.Suspense
                            fallback={<Mangadex_suspense__ />}
                        >
                            <MangaList src={collec.get_data()} />
                        </React.Suspense>
                    )
                }
            </CollectionComponnent_WithQuery>
        </MyErrorBounderies>
    );
}

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