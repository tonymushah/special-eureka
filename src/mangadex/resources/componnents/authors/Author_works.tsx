import * as Chakra from "@chakra-ui/react";
import React from "react";

import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Author } from "../../../api/structures/Author";
import { Collection } from "../../../api/structures/Collection";
import { Manga } from "../../../api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../../../resources/componnents/Collection/Collection";
import IsPingable from "../../../resources/componnents/IsPingable";
import IsPingable_defaultError from "../../../resources/componnents/IsPingable_defaultError";
import MangaList from "../../../resources/componnents/mangas/v1/MangaList";
import { get_author_works_promise, get_author_works_query_key_byAuthor_ID } from "../../../resources/hooks/AuthorState";


export default function Author_works(props: {
    src: Author
}) {
    const client = useHTTPClient();
    const query_key = get_author_works_query_key_byAuthor_ID({
        author_id: props.src.get_id()
    });
    return (
        <Chakra.Box
        >
            <Chakra.Text>Works : {props.src.get_some_relationshipLength("manga")}</Chakra.Text>
            <IsPingable
                client={client}
                onError={(query) => (
                    <IsPingable_defaultError
                        query={query}
                    />
                )}
                onSuccess={(query) => (
                    <Chakra.Box>
                        <CollectionComponnent_WithQuery<Manga>
                            fn={() => {
                                return get_author_works_promise({
                                    author_id: props.src.get_id(),
                                    client: client
                                });
                            }}
                            queryKey={query_key}
                            query_options={{
                                staleTime: Infinity
                            }}
                        >
                            {
                                (data: Collection<Manga>) => (
                                    <MangaList
                                        src={data.get_data()}
                                    />
                                )
                            }
                        </CollectionComponnent_WithQuery>
                    </Chakra.Box>
                )}
                onLoading={
                    <Chakra.Box>
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            />

        </Chakra.Box>
    )

}