import * as Chakra from "@chakra-ui/react";
import React from "react";

import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Author } from "@mangadex/api/structures/Author";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import IsPingable_defaultError from "@mangadex/resources/componnents/IsPingable_defaultError";
import MangaList from "@mangadex/resources/componnents/mangas/v1/MangaList";
import { get_author_works_promise, get_author_works_query_key_byAuthor_ID } from "@mangadex/resources/hooks/AuthorState";
import { useQueryClient } from "@tanstack/react-query";


export default function Author_works(props: {
    src: Author
}) {
    const client = useHTTPClient();
    const query_key = get_author_works_query_key_byAuthor_ID({
        author_id: props.src.get_id()
    });
    const queryClient = useQueryClient();
    const [works, setWorks] = React.useState("Loading");
    React.useEffect(() => {
        const query_data = queryClient.getQueryData<Collection<Manga>>(query_key);
        if(query_data !== undefined){
            setWorks(`${query_data.get_total()}`); 
        }else{
            setWorks("Loading...");
        }
    }, [queryClient.getQueryData<Collection<Manga>>(query_key)]);
    return (
        <Chakra.Box
        >
            <Chakra.Text>Works : {works}</Chakra.Text>
            <IsPingable
                client={client}
                onError={(query) => (
                    <IsPingable_defaultError
                        query={query}
                    />
                )}
                onSuccess={() => (
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
    );

}