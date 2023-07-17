import React from "react";
import * as Chakra from "@chakra-ui/react";

import * as FontAwesome from "react-icons/fa";
import { Manga } from "@mangadex/api/structures/Manga";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";

const MangaElementDef2 = React.lazy(() => import("../MangaElementDef2"));
const MangaElementDef = React.lazy(() => import("../MangaElementDef"));
const MangaVerticalElement = React.lazy(() => import("../MangaVerticalElement"));


export default function MangaList(props: {
    src: Array<Manga>
}) {
    const { data , updateListOption } = useMangaListOption();
    return (
        <Chakra.Tabs padding={"5px"} align="end" isLazy index={data} onChange={updateListOption}>
            <Chakra.TabList>
                <Chakra.Tab>
                    <FontAwesome.FaThList />
                </Chakra.Tab>
                <Chakra.Tab>
                    <FontAwesome.FaThLarge />
                </Chakra.Tab>
                <Chakra.Tab>
                    <FontAwesome.FaTh />
                </Chakra.Tab>
            </Chakra.TabList>
            <Chakra.TabPanels textAlign={"start"}>
                <Chakra.TabPanel padding={"5px"} >
                    <Chakra.Stack>
                        {
                            props.src.map((value) => (
                                <React.Suspense
                                    fallback={
                                        <MangaFallback2 />
                                    }
                                    key={value.get_id()}
                                >
                                    <MangaElementDef2 src={value} />
                                </React.Suspense>
                            ))
                        }
                    </Chakra.Stack>
                </Chakra.TabPanel>
                <Chakra.TabPanel padding={"5px"}>
                    <Chakra.Wrap>
                        {
                            props.src.map((value) => (
                                <Chakra.WrapItem
                                    key={value.get_id()}
                                > 
                                    <React.Suspense
                                        fallback={
                                            <MangaElementFallback />
                                        }
                                    >
                                        <MangaElementDef src={value} />
                                    </React.Suspense>
                                </Chakra.WrapItem>
                            ))
                        }
                    </Chakra.Wrap>
                </Chakra.TabPanel>
                <Chakra.TabPanel padding={"5px"}>
                    <Chakra.Wrap>
                        {
                            props.src.map((value) => (
                                <Chakra.WrapItem key={value.get_id()}>
                                    <React.Suspense
                                        fallback={
                                            <MangaVerticalElementFallback/>
                                        }
                                    >
                                        <MangaVerticalElement src={value} />
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