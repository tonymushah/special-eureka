import * as Chakra from "@chakra-ui/react";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";
import { TabList } from "./TabList";
import TabPanels from "./TabPanels";

export default function ActualTab() {
    const { data, updateListOption } = useMangaListOption();
    return (
        <Chakra.Tabs paddingTop={"5px"} padding={0} align="end" isLazy index={data} onChange={updateListOption}>
            <TabList />
            <TabPanels/>
        </Chakra.Tabs>
    );
}