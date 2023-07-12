import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { ChapterPropsProvider } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import AddInHistory from "./AddInHistory";
import ChapterFullScreen from "./ChapterFullScren";
import { Drawer_P_Hotkeys } from "./Drawer";
import Non_FullScreen from "./Non_FullScreen";
export default function Chapter_Page_Success(props: {
    data: Chapter
}) {
    return (
        <ChapterPropsProvider value={{
            chapter: props.data
        }}>
            <AddInHistory />
            <Drawer_P_Hotkeys />
            <Chakra.Box
                height={"fit-content"}
            >
                <Non_FullScreen />
                <ChapterFullScreen />
            </Chakra.Box>
        </ChapterPropsProvider >
    );
}
