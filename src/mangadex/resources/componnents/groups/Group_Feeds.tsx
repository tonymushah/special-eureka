import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
"../../../"
import TryCatch from "../../../../commons-res/components/TryCatch";
import { Asc_Desc, get_MangaChapter_Accordions_byChapterArray, Offset_limits, Order } from "../../../api/internal/Utils";
import { Collection } from "../../../api/structures/Collection";
import { CollectionComponnent_WithQuery } from "../../../resources/componnents/Collection/Collection";
import MangaFallback2 from "../../../resources/componnents/mangas/v1/MangaElement2Fallback";

import { Chapter } from "../../../api/structures/Chapter";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";

const MangaChapterAccordion_Element = React.lazy(() => import("../mangas/v1/MangaChapterAccordion_Element"));


export default function Group_Feeds(props: {
    id: string
}) {
    const client = useHTTPClient();
    return (
        <CollectionComponnent_WithQuery<Chapter>
            queryKey={"mdx-group_feeds-" + props.id}
            fn={() => {
                let offset_Limits = new Offset_limits();
                offset_Limits.set_limits(25);
                return Chapter.search({
                    offset_limits: offset_Limits,
                    "group": [
                        props.id
                    ],
                    order: new Order(Asc_Desc.desc()),
                    client: client
                })
            }}
            query_options={{
                staleTime: Infinity
            }}
        >
            {
                (value1: Collection<Chapter>) => (
                    <TryCatch
                        catch={(error) => (
                            <Chakra.Alert>
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>
                                    {
                                        error.name
                                    }
                                </Chakra.AlertTitle>
                                <Chakra.AlertDescription>
                                    {
                                        error.message
                                    }
                                </Chakra.AlertDescription>
                            </Chakra.Alert>
                        )}
                    >
                        <React.Suspense
                            fallback={<div>Loading...</div>}
                        >
                            <Chakra.Stack>
                                {
                                    get_MangaChapter_Accordions_byChapterArray(value1.get_data()).map(value2 => (
                                        <React.Suspense
                                            fallback={
                                                <MangaFallback2 />
                                            }
                                        >
                                            <MangaChapterAccordion_Element src={value2} />
                                        </React.Suspense>
                                    ))
                                }
                            </Chakra.Stack>
                        </React.Suspense>
                    </TryCatch>
                )
            }
        </CollectionComponnent_WithQuery>
    )
}
