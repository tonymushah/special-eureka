import * as Chakra from "@chakra-ui/react";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";
import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";

export default function ActualTab() {
    const { data, updateListOption } = useMangaListOption();
    return (
        <Chakra.Tabs isLazy align={"end"} index={data} onChange={(i) => {
            updateListOption(i);
        }}>
            <TabList />
            <TabPanels/>
        </Chakra.Tabs>
    );
}