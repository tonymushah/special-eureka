import * as Chakra from "@chakra-ui/react";
import TryCatch from "../../../commons-res/components/TryCatch";
import ErrorEL1 from "../../resources/componnents/error/ErrorEL1";
import React from "react";
import { Mangadex_suspense } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { get_MangaChapter_Accordions_byChapterArray, Offset_limits, Order } from "../../api/internal/Utils";
import { Chapter } from "../../api/structures/Chapter";
import { CollectionComponnent_WithQuery } from "../../resources/componnents/Collection/Collection";
import MangaFallback2 from "../../resources/componnents/mangas/v1/MangaElement2Fallback";
import { Container } from "react-bootstrap";

const IsPingable = React.lazy(() => import("../../resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("../../resources/componnents/IsPingable_defaultError"))
const MangaChapterAccordion_Element = React.lazy(() => import("../../resources/componnents/mangas/v1/MangaChapterAccordion_Element"));

export default function LatestUpdates() {
    const offset_limit = new Offset_limits();
    offset_limit.set_limits(25);
    const client = useHTTPClient();
    const queryKey = "mdx-latest-updates";
    return (
        <Container>
            <Mangadex_suspense>
                <IsPingable
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
                    client={client}
                    onError={(query) => (
                        <Mangadex_suspense>
                            <IsPingable_defaultError
                                query={query}
                            />
                        </Mangadex_suspense>
                    )}
                    onSuccess={() => (
                        <Chakra.Box>
                            <Chakra.Heading
                                fontFamily={"inherit"}
                            >
                                Latest Updates
                            </Chakra.Heading>
                            <Chakra.Box>
                                <TryCatch
                                    catch={(error) => (
                                        <ErrorEL1 error={error} />
                                    )}
                                >
                                    <CollectionComponnent_WithQuery<Chapter>
                                        fn={() => {
                                            return Chapter.search({
                                                offset_limits: offset_limit,
                                                order: new Order("desc"),
                                                client: client
                                            })
                                        }}
                                        queryKey={queryKey}
                                    >
                                        {
                                            (collection) => (
                                                <Mangadex_suspense>
                                                    <Chakra.Stack>
                                                        {
                                                            get_MangaChapter_Accordions_byChapterArray(collection.get_data()).map((value) => (
                                                                <React.Suspense
                                                                    fallback={
                                                                        <MangaFallback2 />
                                                                    }
                                                                >
                                                                    <MangaChapterAccordion_Element src={value} />
                                                                </React.Suspense>
                                                            ))
                                                        }
                                                    </Chakra.Stack>
                                                </Mangadex_suspense>
                                            )
                                        }
                                    </CollectionComponnent_WithQuery>
                                </TryCatch>
                            </Chakra.Box>
                        </Chakra.Box>
                    )}
                />
            </Mangadex_suspense>
        </Container>
    )
}