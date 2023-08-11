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
                <Chakra.Box
                    position={"fixed"}
                    zIndex={"banner"}
                    width={"100%"}
                >
                    <Chakra.IconButton
                        aria-label="Exit FullScreen"
                        colorScheme={"orange"}
                        opacity={"0.2"}
                        icon={<ChakraIcons.CloseIcon />}
                        float={"left"}
                        _hover={{
                            opacity: "1"
                        }}
                        onClick={() => {
                            props.onCloseButtonClick();
                        }}
                    />

                    <Chakra.IconButton aria-label="Reading Option"
                        colorScheme={"orange"}
                        opacity={"0.2"}
                        icon={<ChakraIcons.HamburgerIcon />}
                        float={"right"}
                        _hover={{
                            opacity: "1"
                        }}
                        onClick={() => {
                            changeOption(true);
                        }}
                    />
                </Chakra.Box>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment/>
    );
}