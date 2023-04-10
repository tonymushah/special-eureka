import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import * as FontAwesome from "react-icons/fa";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";
import React from "react";
import { useMangaListOption } from "../../../../hooks/MangaListManagerState";

const MangaElementDef2_withID = React.lazy(() => import("../MangaElementDef2_withID"));
const MangaElementDef_wID = React.lazy(() => import("../MangaElementDef_wID"));
const MangaVerticalElement_wID = React.lazy(() => import("../MangaVerticalElement_wID"));

export default function MangaListByArrayMangaID(props: {
    src: Array<string>
}) {
    const { data , updateListOption } = useMangaListOption({});
    return (
        <Chakra.Tabs isLazy align={"end"} index={data}>
            <Chakra.TabList>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(0);
                    }}
                >
                    <FontAwesome.FaThList />
                </Chakra.Tab>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(1);
                    }}
                >
                    <FontAwesome.FaThLarge />
                </Chakra.Tab>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(2);
                    }}
                >
                    <FontAwesome.FaTh />
                </Chakra.Tab>
            </Chakra.TabList>
            <Chakra.TabPanels>
                <Chakra.TabPanel>
                    <Chakra.Stack>
                        {
                            props.src.map((value) => (
                                <React.Suspense
                                    fallback={
                                        <MangaFallback2 />
                                    }
                                >
                                    <MangaElementDef2_withID mangaID={value} />
                                </React.Suspense>

                            ))
                        }
                    </Chakra.Stack>
                </Chakra.TabPanel>
                <Chakra.TabPanel>
                    <Chakra.Wrap>
                        {
                            props.src.map((value) => (
                                <Chakra.WrapItem>
                                    <React.Suspense fallback={
                                        <MangaElementFallback />
                                    }>
                                        <MangaElementDef_wID mangaID={value} />
                                    </React.Suspense>

                                </Chakra.WrapItem>
                            ))
                        }
                    </Chakra.Wrap>
                </Chakra.TabPanel>
                <Chakra.TabPanel textAlign={"center"}>
                    <Chakra.Wrap>
                        {
                            props.src.map((value) => (
                                <Chakra.WrapItem>
                                    <React.Suspense fallback={
                                        <MangaVerticalElementFallback />
                                    }>
                                        <MangaVerticalElement_wID mangaID={value} />
                                    </React.Suspense>
                                </Chakra.WrapItem>
                            ))
                        }
                    </Chakra.Wrap>
                </Chakra.TabPanel>
            </Chakra.TabPanels>
        </Chakra.Tabs>
    );
}
