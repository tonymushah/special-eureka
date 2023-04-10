import * as Chakra from "@chakra-ui/react";
//import React from "react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Cover } from "@mangadex/api/structures/Cover";
import { Manga } from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../../Collection/Collection";
import CoverImage from "../../covers/v1/CoverImage";

//const Cover_Plus_Zoom = React.lazy(() => import("../../covers/utils/Cover_Plus_Zoom"));

type MangaPageProps = {
    src: Manga
}

export function Covers_Manga(props: MangaPageProps) {
    const client = useHTTPClient();
    const offset_limits = new Offset_limits();
    const queryKey = ["mdx", "manga", props.src.get_id(), "-covers"];
    offset_limits.set_limits(25);
    return (
        <CollectionComponnent_WithQuery<Cover>
            fn={() => {
                return Cover.search({
                    offset_Limits: offset_limits,
                    mangaIDs: [
                        props.src.get_id()
                    ],
                    client: client
                });
            }}
            queryKey={queryKey}
            query_options={{
                staleTime: 1000 * 60 * 30
            }}
            onLoading={
                <Chakra.Box
                    width={"full"}
                    height={"100vh"}
                >
                    <Chakra.Center>
                        <Chakra.Spinner
                            size={"lg"}
                            thickness={"2px"}
                            color={"orange"}
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            {(getted_collection) => (
                <Chakra.Wrap>
                    {
                        getted_collection.get_data().map((value) => (
                            <Chakra.WrapItem
                                key={value.get_id()}
                                padding={"10px"}
                                width={"10em"}
                            >
                                <Chakra.Card
                                    border={"1px"}
                                    borderColor={"black"}
                                >
                                    <CoverImage
                                        isThumbail={true}
                                        size={256}
                                        src={value}
                                    />
                                </Chakra.Card>
                            </Chakra.WrapItem>
                        ))
                    }
                </Chakra.Wrap>
            )}
        </CollectionComponnent_WithQuery>
    );
}