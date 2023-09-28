import Manga, { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import MangaSearch_withAllIncludes from "@mangadex/api/structures/SearchType/MangaSearch_withAllIncludes";
import CollectionComponnent_withInfiniteQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_withInfiniteQuery";
import { InfiniteQueryConsumer } from "@mangadex/resources/componnents/Collection/InfiniteQueryConsumer";
import React from "react";
import MyErrorBounderies from "../../../error/MyErrorBounderies";
import MangaListWithCollectionArray from "../../v1/MangaList/ViaMangaCollectionArray";

export function Manga_Search_Result(props: MangaSearch_withAllIncludes) {
    const _queryKey_ = React.useMemo(() => queryKey(), [props]);
    return (
        <MyErrorBounderies>
            <CollectionComponnent_withInfiniteQuery<Manga>
                queryKey={_queryKey_}
                queryFn={async function({ pageParam }){
                    const offset_limit = props.offset_Limits;
                    return await Manga_with_allRelationship.search({
                        ...props,
                        offset_Limits : pageParam ?? offset_limit
                    });
                }}
            >
                {(query) => (
                    <InfiniteQueryConsumer<Manga> query={query}>
                        {(data) => (
                            <MangaListWithCollectionArray src={data}/>
                        )}
                    </InfiniteQueryConsumer>
                )}
            </CollectionComponnent_withInfiniteQuery>
        </MyErrorBounderies>
    );
}

export function queryKey() {
    return ["mdx", "manga", "search", `${Math.random() * 100}`];
}

