import * as Chakra from "@chakra-ui/react";
import React from "react";

import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { useMangaListOption } from "@mangadex/resources/hooks/MangaListManagerState";
import { motion } from "framer-motion";
import * as FontAwesome from "react-icons/fa";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";

const MangaElementDef2 = React.lazy(() => import("../MangaElementDef2"));
const MangaElementDef = React.lazy(() => import("../MangaElementDef"));
const MangaVerticalElement = React.lazy(() => import("../MangaVerticalElement"));

export default function MangaListWithCollectionArray(props: {
    src: Collection<Manga>[]
}) {
    const { data, updateListOption } = useMangaListOption();
    return (
        <Chakra.Tabs paddingTop={"5px"} padding={0} align="end" isLazy index={data} onChange={updateListOption}>
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
                <Chakra.TabPanel
                    key={"ThList"}
                    padding={"5px"}
                >
                    <Chakra.Stack>
                        {
                            props.src.map((value, index) => (
                                <React.Fragment key={`${JSON.stringify(value)}-${index}-1`}>
                                    {
                                        value.get_data().map((value, index) => (
                                            <React.Suspense
                                                fallback={
                                                    <MangaFallback2 />
                                                }
                                                key={`${value.get_id()}-${index}-1`}
                                            >
                                                <MangaElementDef2 src={value} />
                                            </React.Suspense>
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                    </Chakra.Stack>
                </Chakra.TabPanel>
                <Chakra.TabPanel
                    key={"ThLarge"}
                    padding={"5px"}
                >
                    <Chakra.Wrap>
                        {
                            props.src.map((value, index) => (
                                <React.Fragment key={`${JSON.stringify(value)}-${index}-2`}>
                                    {
                                        value.get_data().map((value, index) => (
                                            <Chakra.WrapItem
                                                key={`${value.get_id()}-${index}-2`}
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
                                </React.Fragment>
                            ))
                        }
                    </Chakra.Wrap>
                </Chakra.TabPanel>
                <Chakra.TabPanel
                    as={motion.div}
                    key={"Th"}
                    padding={"5px"}
                >
                    <Chakra.Wrap>
                        {
                            props.src.map((value, index) => (
                                <React.Fragment key={`${JSON.stringify(value)}-${index}-3`}>
                                    {
                                        value.get_data().map((value, index) => (
                                            <Chakra.WrapItem
                                                key={`${value.get_id()}-${index}-3`}
                                            >
                                                <React.Suspense
                                                    fallback={
                                                        <MangaVerticalElementFallback />
                                                    }
                                                >
                                                    <MangaVerticalElement src={value} />
                                                </React.Suspense>
                                            </Chakra.WrapItem>
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                    </Chakra.Wrap>
                </Chakra.TabPanel>
            </Chakra.TabPanels>
        </Chakra.Tabs>
    );
}