import { useChapterFullscreen } from "../../../fullscreen/useChapterFullscreen";
import Chapter_on_non_FullScreen from "./Chapter_on_non_FullScreen";
import { Box } from "@chakra-ui/react";

export default function Non_FullScreen(){
    const fullscreen = useChapterFullscreen();
    return (
        <Box
            display={fullscreen.query.data == false ? "initial" : "none"}
        >
            <Chapter_on_non_FullScreen />
        </Box>
    );
}