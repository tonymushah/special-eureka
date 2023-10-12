import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import Collection from "@mangadex/api/structures/Collection";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import ShowErrorDefault from "@mangadex/resources/componnents/router/error/ShowErrorDefault";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";

const AllDownlaodedMangaConsumer = React.lazy(() => import("@mangadex/resources/componnents/download/All_downloaded_Manga_Consumer"));
const MangaListByCollectionArrayMangaID = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangaListByArrayMangaID/ViaCollectionArray"));
const All_downloaded_chapter = React.lazy(() => import("@mangadex/resources/componnents/download/All_downloaded_chapter"));

function OnMangaError(error: Error) {
    return (
        <ShowErrorDefault error={error} />
    );
}

export default function Download_Index_Page() {
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Offline Library | Mangadex");
    }, []);
    return (
        <Chakra.Box>
            <Chakra.Tabs isFitted isLazy variant={"enclosed-colored"} padding={"0px"}>
                <Chakra.TabList>
                    <Chakra.Tab>Manga</Chakra.Tab>
                    <Chakra.Tab>Chapters</Chakra.Tab>
                </Chakra.TabList>
                <Chakra.TabPanels margin={0}
                    padding={"5px"}
                >
                    <Chakra.TabPanel padding={"1px"}>
                        <React.Suspense
                            fallback={
                                <Chakra.Box>
                                    <Chakra.Text>Loading...</Chakra.Text>
                                </Chakra.Box>
                            }
                        >
                            <AllDownlaodedMangaConsumer
                                query_options={{
                                    staleTime: Infinity
                                }}
                            >
                                {
                                    (value: Collection<string>[]) => (
                                        <React.Suspense
                                            fallback={
                                                <Chakra.Center>
                                                    <Chakra.Box textAlign={"center"}>
                                                        <MangadexSpinner
                                                            size={"md"}
                                                        />
                                                        <Chakra.Text>Loading componnent...</Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Center>
                                            }
                                        ><TryCatch
                                            catch={OnMangaError}
                                        >
                                                <MangaListByCollectionArrayMangaID src={value} />
                                            </TryCatch>
                                        </React.Suspense>
                                    )
                                }
                            </AllDownlaodedMangaConsumer>
                        </React.Suspense>
                    </Chakra.TabPanel>
                    <Chakra.TabPanel>
                        <React.Suspense
                            fallback={
                                <Chakra.Box>
                                    <Chakra.Text>Loading...</Chakra.Text>
                                </Chakra.Box>
                            }
                        >
                            <All_downloaded_chapter query_options={{
                                staleTime: Infinity
                            }} />
                        </React.Suspense>
                    </Chakra.TabPanel>
                </Chakra.TabPanels>
            </Chakra.Tabs>
        </Chakra.Box>
    );
}

export { default as ErrorBoundary } from "./ErrorBoundary";