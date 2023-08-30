import * as Chakra from "@chakra-ui/react";
import * as FontAwesome from "react-icons/fa";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";
import React from "react";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { Collection } from "@mangadex/api/structures/Collection";

const MangaElementDef2_withID = React.lazy(() => import("../MangaElementDef2_withID"));
const MangaElementDef_wID = React.lazy(() => import("../MangaElementDef_wID"));
const MangaVerticalElement_wID = React.lazy(() => import("../MangaVerticalElement_wID"));

export default function MangaListByCollectionArrayMangaID(props: {
    src: Collection<string>[]
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
            <Chakra.TabPanels padding={"2px"}>
                <Chakra.TabPanel padding={"5px"}>
                    <MyErrorBounderies>
                        <Chakra.Stack>
                            {
                                props.src.map((value) => (
                                    <React.Fragment key={`${JSON.stringify(value)}-1`}>
                                        {
                                            value.get_data().map((id) => (
                                                <React.Suspense
                                                    key={`${id}-1`}
                                                    fallback={
                                                        <MangaFallback2 />
                                                    }
                                                >
                                                    <MangaElementDef2_withID mangaID={id} />
                                                </React.Suspense>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Chakra.Stack>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
                <Chakra.TabPanel padding={"5px"}>
                    <MyErrorBounderies>
                        <Chakra.Wrap>
                            {
                                props.src.map((value) => (
                                    <React.Fragment key={`${JSON.stringify(value)}-2`}>
                                        {
                                            value.get_data().map((id) => (
                                                <React.Suspense
                                                    key={`${id}-2`}
                                                    fallback={
                                                        <MangaElementFallback />
                                                    }
                                                >
                                                    <MangaElementDef_wID mangaID={id} />
                                                </React.Suspense>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Chakra.Wrap>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
                <Chakra.TabPanel padding={"5px"} textAlign={"center"}>
                    <MyErrorBounderies>
                        <Chakra.Wrap>
                            {
                                props.src.map((value) => (
                                    <React.Fragment key={`${JSON.stringify(value)}-3`}>
                                        {
                                            value.get_data().map((id) => (
                                                <React.Suspense
                                                    key={`${id}-3`}
                                                    fallback={
                                                        <MangaVerticalElementFallback />
                                                    }
                                                >
                                                    <MangaVerticalElement_wID mangaID={id} />
                                                </React.Suspense>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Chakra.Wrap>
                    </MyErrorBounderies>
                </Chakra.TabPanel>
            </Chakra.TabPanels>
        </Chakra.Tabs>
    );
}
