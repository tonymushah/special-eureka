import * as Chakra from "@chakra-ui/react";
import React from "react";
import { UseQueryOptions } from "react-query";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Chapter } from "../../../api/structures/Chapter";
import { Collection } from "../../../api/structures/Collection";
import Chapter_Element1_byChapID from "../chapter/v1/Chapter_Element1_byChapID";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";

export default function All_downloaded_chapter(props: {
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, "queryKey" | "queryFn">,
}) {
    const client = useHTTPClient();
    const query_key = "mdx-downloaded_chapter";
    return (
        <Chakra.Box>
            <CollectionComponnent_WithQuery<string>
                fn={() => {
                    return Chapter.getAll_downloaded_chap(undefined, client);
                }}
                queryKey={query_key}
                onLoading={
                    <Chakra.AbsoluteCenter>
                        <Chakra.Box>
                            <Chakra.Spinner
                                color={"orange"}
                                thickness={"10px"}
                                size={"xl"}
                            />
                        </Chakra.Box>
                    </Chakra.AbsoluteCenter>
                }
                query_options={props.query_options}
            >
                {
                    (value) => (<Chakra.VStack>
                        {
                            value.get_data().map((value) => (
                                <React.Suspense
                                    fallback={
                                        <Chakra.Box width={"full"}>
                                            <Chakra.Center>
                                                <Chakra.Spinner />
                                            </Chakra.Center>
                                        </Chakra.Box>
                                    }
                                >
                                    <Chapter_Element1_byChapID id={value} />
                                </React.Suspense>
                            ))
                        }
                    </Chakra.VStack>
                    )
                }
            </CollectionComponnent_WithQuery>

        </Chakra.Box>
    );
}
