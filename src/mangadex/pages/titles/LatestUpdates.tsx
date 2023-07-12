import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch, { useCatch } from "@commons-res/components/TryCatch";
import { Offset_limits, Order, get_MangaChapter_Accordions_byChapterArray } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import { CollectionComponnent_WithQuery } from "@mangadex/resources/componnents/Collection/Collection";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";

const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));
const MangaChapterAccordion_Element = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaChapterAccordion_Element"));

function Error_(){
    const error = useCatch();
    return (
        <ErrorEL1 error={error}/>
    );
}

export default function LatestUpdates() {
    const offset_limit = new Offset_limits();
    offset_limit.set_limits(25);
    const client = useHTTPClient();
    const queryKey = ["mdx", "latest-updates"];
    const userOption = useUserOption();
    useAppWindowTitle("Latest Updates | Mangadex");
    useTrackEvent("mangadex-latest-update-entrance");
    return (
        <ChakraContainer>
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
                                    catch={<Error_/>}
                                >
                                    <CollectionComponnent_WithQuery<Chapter>
                                        fn={async () => {
                                            const userLanguages = await userOption.getLanguages();
                                            return await Chapter.search({
                                                offset_limits: offset_limit,
                                                order: new Order("desc"),
                                                client: client,
                                                translatedLanguage : userLanguages.map((lang) => lang.get_two_letter())
                                            });
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
                                                                    key={value.$mangaid}
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
        </ChakraContainer>
    );
}