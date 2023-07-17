import * as Chakra from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import Timeago from "react-timeago";
import ChapterContextMenu from "../ChapterContextMenu";
import ChapterLang from "../Chapter_Element1/Lang";
import Title from "../Chapter_Element1/Title";
import { ChapterPropsProvider } from "../PropsContext";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const ChapterDownloadButton = React.lazy(() => import("../ChapterDownloadButton"));

export default function Chapter_Element2(props: {
    chapter: Chapter,
}) {
    return (
        <ChapterPropsProvider value={props}>
            <ChapterContextMenu id={props.chapter.get_id()}>
                <Tooltip>
                    <Chakra.Box>
                        <Chakra.Grid templateColumns={"repeat(12, 1fr)"}>
                            <Chakra.GridItem colSpan={3}>
                                <Chakra.Center>
                                    <ChapterLang />
                                </Chakra.Center>
                            </Chakra.GridItem>
                            <Chakra.GridItem colSpan={9}>
                                <Chakra.Heading noOfLines={1} margin={0} size={"sm"} fontFamily={"inherit"}>
                                    <Title />
                                </Chakra.Heading>
                            </Chakra.GridItem>
                        </Chakra.Grid>
                        <Chakra.Grid templateColumns={"repeat(12, 1fr)"}>
                            <Chakra.GridItem colSpan={3}>
                                <Chakra.Center>
                                    <React.Suspense
                                        fallback={
                                            <MangadexSpinner size={"md"} />
                                        }
                                    >
                                        <ChapterDownloadButton hstackProps={{
                                            spacing : "2px"
                                        }} chapter={props.chapter} />
                                    </React.Suspense>
                                </Chakra.Center>
                            </Chakra.GridItem>
                            <Chakra.GridItem colSpan={9}>
                                <Chakra.Text
                                    fontSize={{
                                        base: 15
                                    }}
                                    noOfLines={1}
                                    margin={0}
                                >
                                    <Timeago date={new Date(props.chapter.get_createdAt())}></Timeago>
                                </Chakra.Text>
                            </Chakra.GridItem>
                        </Chakra.Grid>
                    </Chakra.Box>
                </Tooltip>
            </ChapterContextMenu>
        </ChapterPropsProvider>
    );
}