import React from "react";
import * as Chakra from "@chakra-ui/react";

const AllDownlaodedMangaConsumer = React.lazy(() => import("../../resources/componnents/download/All_downloaded_Manga_Consumer"));
const MangaListByArrayMangaID = React.lazy(() => import("../../resources/componnents/mangas/v1/MangaListByArrayMangaID"));
const All_downloaded_chapter = React.lazy(() => import("../../resources/componnents/download/All_downloaded_chapter"));

export default function Download_Index_Page() {
    return (
        <Chakra.Box>
            <Chakra.Tabs isFitted isLazy variant={"enclosed-colored"}>
                <Chakra.TabList>
                    <Chakra.Tab>Manga</Chakra.Tab>
                    <Chakra.Tab>Chapters</Chakra.Tab>
                </Chakra.TabList>
                <Chakra.TabPanels>
                    <Chakra.TabPanel>
                        <React.Suspense
                            fallback={
                                <Chakra.Box>
                                    <Chakra.Text>Loading...</Chakra.Text>
                                </Chakra.Box>
                            }
                        >
                            <AllDownlaodedMangaConsumer>
                                {
                                    (value: Array<string>) => (
                                        <React.Suspense
                                            fallback={
                                                <Chakra.Center>
                                                    <Chakra.Box textAlign={"center"}>
                                                        <Chakra.Spinner
                                                            size={"md"}
                                                        />
                                                        <Chakra.Text>Loading componnent...</Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Center>
                                            }
                                        >
                                            <MangaListByArrayMangaID src={value} />
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
                            <All_downloaded_chapter />
                        </React.Suspense>
                    </Chakra.TabPanel>
                </Chakra.TabPanels>
            </Chakra.Tabs>
        </Chakra.Box>
    )
}