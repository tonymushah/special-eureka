import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useReadingDraweContext } from ".";

export function Header() {
    const chapter = useReadingDraweContext();

    return (
        <Chakra.DrawerHeader>
            Chapter {chapter.get_chapter()} {
                chapter.get_title() == null || chapter.get_title() == undefined || chapter.get_title() == "" ? (<React.Fragment />) : (<React.Fragment> - {chapter.get_title()}</React.Fragment>)
            }
        </Chakra.DrawerHeader>
    );
}
