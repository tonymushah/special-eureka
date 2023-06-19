import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";

export default function ReadingOptions() {
    const { changeOption } = useChapterReadingDrawer();
    return (
        <React.Fragment>
            <Chakra.Button
                leftIcon={<ChakraIcons.HamburgerIcon />}
                onClick={() => {
                    changeOption(true);
                }}
                colorScheme={"orange"}
            >
                Reading Options
            </Chakra.Button>
        </React.Fragment>
    );
}