import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";
import React from "react";

export default function FullScreenOptions(props: React.PropsWithChildren<{
    isShow: boolean,
    chapter: Chapter,
    onCloseButtonClick: () => void
}>) {
    const { changeOption } = useChapterReadingDrawer();
    if (props.isShow == true) {
        return (
            <React.Fragment>
                <Chakra.IconButton
                    position={"fixed"}
                    zIndex={"banner"}
                    aria-label="Exit FullScreen"
                    colorScheme={"orange"}
                    transition={"ease-in-out"}
                    opacity={"0.2"}
                    icon={<ChakraIcons.CloseIcon />}
                    _hover={{
                        opacity: "1"
                    }}
                    onClick={() => {
                        props.onCloseButtonClick();
                    }}
                />
                <Chakra.IconButton
                    left={"97%"}
                    position={"fixed"}
                    zIndex={"banner"}
                    aria-label="Reading Option"
                    colorScheme={"orange"}
                    opacity={"0.2"}
                    icon={<ChakraIcons.HamburgerIcon />}
                    _hover={{
                        opacity: "1"
                    }}
                    transition={"ease-in-out"}
                    onClick={() => {
                        changeOption(true);
                    }}
                />
            </React.Fragment>
        );
    }
    return (
        <React.Fragment />
    );
}