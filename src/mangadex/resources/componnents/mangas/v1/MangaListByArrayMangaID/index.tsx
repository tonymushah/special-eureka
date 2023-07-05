import * as Chakra from "@chakra-ui/react";
import * as FontAwesome from "react-icons/fa";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";
import React from "react";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";

const MangaElementDef2_withID = React.lazy(() => import("../MangaElementDef2_withID"));
const MangaElementDef_wID = React.lazy(() => import("../MangaElementDef_wID"));
const MangaVerticalElement_wID = React.lazy(() => import("../MangaVerticalElement_wID"));

export default function MangaListByArrayMangaID(props: {
    src: Array<string>
}) {
    const { data, updateListOption } = useMangaListOption();
    return (
        <Chakra.Tabs isLazy align={"end"} index={data} onChange={(i) => {
            updateListOption(i);
        }}>
            <Chakra.TabList>
                <Chakra.Tab
                >
                    <FontAwesome.FaThList />
                </Chakra.Tab>
                <Chakra.Tab
                >
                    <FontAwesome.FaThLarge />
                </Chakra.Tab>
                <Chakra.Tab
                >
                    <FontAwesome.FaTh />
                </Chakra.Tab>
            </Chakra.TabList>
            <Chakra.TabPanels>
                <Chakra.TabPanel>
                    <MyErrorBounderies>
                        <Chakra.Stack>
                            {
                                props.src.map((value) => (
                                    <React.Suspense
                                        key={value}
                                        fallback={
                                            <MangaFallback2 />
                                        }
                                    >
                                        <MangaElementDef2_withID mangaID={value} />
                                    </React.Suspense>
                                ))
                            }
                        </Chakra.Stack>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
                <Chakra.TabPanel>
                    <MyErrorBounderies>
                        <Chakra.Wrap>
                            {
                                props.src.map((value) => (
                                    <Chakra.WrapItem
                                        key={value}
                                    >
                                        <React.Suspense fallback={
                                            <MangaElementFallback />
                                        }>
                                            <MangaElementDef_wID mangaID={value} />
                                        </React.Suspense>
                                    </Chakra.WrapItem>
                                ))
                            }
                        </Chakra.Wrap>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
                <Chakra.TabPanel textAlign={"center"}>
                    <MyErrorBounderies>
                        <Chakra.Wrap>
                            {
                                props.src.map((value) => (
                                    <Chakra.WrapItem
                                        key={value}
                                    >
                                        <React.Suspense fallback={
                                            <MangaVerticalElementFallback />
                                        }>
                                            <MangaVerticalElement_wID mangaID={value} />
                                        </React.Suspense>
                                    </Chakra.WrapItem>
                                ))
                            }
                        </Chakra.Wrap>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
            </Chakra.TabPanels>
        </Chakra.Tabs>
    );
}
