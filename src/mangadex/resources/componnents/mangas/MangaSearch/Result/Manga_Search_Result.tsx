import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import { Mangadex_suspense__ } from "@mangadex/index";
import React from "react";
import CollectionComponnent_WithQuery from "../../../Collection/CollectionComponnent_WithQuery";
import MyErrorBounderies from "../../../error/MyErrorBounderies";
import { MangaList } from ".";

export function Manga_Search_Result(props: MangaSearch_withAllIncludes) {
    return (
        <MyErrorBounderies>
            <CollectionComponnent_WithQuery<Manga>
                // [x] Refactor into a new file
                queryKey={queryKey()}
                fn={async () => {
                    return await Manga_with_allRelationship.search(props);
                }}
            >
                {(collec) => (
                    <React.Suspense
                        fallback={<Mangadex_suspense__ />}
                    >
                        <MangaList src={collec.get_data()} />
                    </React.Suspense>
                )}
            </CollectionComponnent_WithQuery>
        </MyErrorBounderies>
    );
}

export function queryKey() {
    return ["mdx", "manga", "search", `${Math.random() * 100}`];
}

