import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";
import Overlay from "./Overlay";
import { Body } from "./Body";
import { Header } from "./Header";

const ReadingDrawerContext = React.createContext<Chapter | undefined>(undefined);

export function useReadingDraweContext() {
    const data = React.useContext(ReadingDrawerContext);
    if (data == undefined) {
        throw new Error("The Reading Drawer Context Provider is not implemented");
    }
    return data;
}

export function ReadingDrawerContextProvider({ value, children }: React.PropsWithChildren<{
    value: Chapter
}>) {
    return (
        <ReadingDrawerContext.Provider value={value}>
            {children}
        </ReadingDrawerContext.Provider>
    );
}

export default function ReadingDrawer(props: {
    chapter: Chapter,
}) {
    const { query, changeOption } = useChapterReadingDrawer();
    return (
        <ReadingDrawerContextProvider value={props.chapter}>
            <Chakra.Drawer
                isOpen={query.data ?? false}
                onClose={() => {
                    changeOption(false);
                }}
            >
                <Overlay />
                <Chakra.DrawerContent
                    zIndex={"100"}
                    fontFamily={"inherit"}
                >
                    <Chakra.DrawerCloseButton />
                    <Header />
                    <Body />
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </ReadingDrawerContextProvider>
    );
}