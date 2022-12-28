import React from "react";
import * as Chakra from "@chakra-ui/react";
import AllDownlaodedMangaList from "../../resources/componnents/download/All_downloaded_manga";
import All_downloaded_chapter from "../../resources/componnents/download/All_downloaded_chapter";

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
                        <AllDownlaodedMangaList />
                    </Chakra.TabPanel>
                    <Chakra.TabPanel>
                        <All_downloaded_chapter/>
                    </Chakra.TabPanel>
                </Chakra.TabPanels>
            </Chakra.Tabs>
        </Chakra.Box>
    )
}