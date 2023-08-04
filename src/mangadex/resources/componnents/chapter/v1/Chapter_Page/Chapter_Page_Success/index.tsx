import { Box } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { ChapterPropsProvider } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import AddInHistory from "./AddInHistory";
import ChapterFullScreen from "./ChapterFullScren";
import { Drawer_P_Hotkeys } from "./Drawer";
import Non_FullScreen from "./Non_FullScreen";
import WindowTitle from "./WindowTitle";

export default function Chapter_Page_Success(props: {
    data: Chapter
}) {
    return (
        <ChapterPropsProvider value={{
            chapter: props.data
        }}>
            <WindowTitle/>
            <AddInHistory />
            <Drawer_P_Hotkeys />
            <Box
                height={"fit-content"}
            >
                <Non_FullScreen />
                <ChapterFullScreen />
            </Box>
        </ChapterPropsProvider >
    );
}
