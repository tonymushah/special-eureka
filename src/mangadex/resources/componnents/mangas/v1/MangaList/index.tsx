import React from "react";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import * as FontAwesome from "react-icons/fa";
import { Manga } from "../../../../../api/structures/Manga";
import MangaFallback2 from "../MangaElement2Fallback";
import MangaElementFallback from "../MangaElementFallback";
import MangaVerticalElementFallback from "../MangaVerticalElementFallback";
import { useMangaListOption } from "../../../../hooks/MangaListManagerState";

const MangaElementDef2 = React.lazy(() => import("../MangaElementDef2"));
const MangaElementDef = React.lazy(() => import("../MangaElementDef"));
const MangaVerticalElement = React.lazy(() => import("../MangaVerticalElement"));


export default function MangaList(props: {
    src: Array<Manga>
}) {
    const { data , updateListOption } = useMangaListOption({})
    return (
        <Chakra.Tabs align="end" isLazy index={data}>
            <Chakra.TabList>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(0)
                    }}
                >
                    <FontAwesome.FaThList />
                </Chakra.Tab>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(1)
                    }}
                >
                    <FontAwesome.FaThLarge />
                </Chakra.Tab>
                <Chakra.Tab
                    onClick={() => {
                        updateListOption(2)
                    }}
                >
                    <FontAwesome.FaTh />
                </Chakra.Tab>
            </Chakra.TabList>
            <Chakra.TabPanels textAlign={"start"}>
                <Chakra.TabPanel>
                    <Chakra.Stack>
                        {
                            props.src.map((value) => (
                                <React.Suspense
                                    fallback={
                                        <MangaFallback2 />
                                    }
                                >
                                    <MangaElementDef2 src={value} />
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
                <Chakra.TabPanel>
                    <Chakra.Wrap>
                        {
                            props.src.map((value) => (
                                <Chakra.WrapItem>
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