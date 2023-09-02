import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import Timeago from "react-timeago";
import ChapterContextMenu from "../ChapterContextMenu";
import { ChapterPropsProvider } from "../PropsContext";
import Groups from "./Groups";
import ChapterLang from "./Lang";
import Title from "./Title";
import User from "./User";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import TryCatch from "@commons-res/components/TryCatch";

const ChapterDownloadButton = React.lazy(() => import("../ChapterDownloadButton"));



export default function Chapter_Element1(props: {
    chapter: Chapter,
}) {
    const gray500 = Chakra.useToken("colors", "gray.500");
    const onHover = Chakra.useColorModeValue("gray.100", "gray.700");
    return (
        <ChapterPropsProvider value={props}>
            <ChapterContextMenu
                id={props.chapter.get_id()}
            >
                <Chakra.Box
                    width={"full"}
                    padding={1}
                    _hover={{
                        background: onHover
                    }}
                    boxShadow={`0px 0px 5px ${gray500}`}
                    m={1}
                    borderRadius={10}
                >
                    <Chakra.Grid
                        templateColumns={"repeat(12, 1fr)"}
                        height={"fit-content"}
                    >
                        <Chakra.GridItem
                            colSpan={{
                                base: 1,
                                sm: 1,
                                md: 1,
                                lg: 1
                            }}
                        >
                            <Chakra.Center>
                                <ChapterLang/>
                            </Chakra.Center>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            colSpan={{
                                base: 7,
                                lg: 8
                            }}
                        >
                            <Chakra.Box
                            >
                                <Chakra.Heading noOfLines={1} margin={0} size={"sm"} fontFamily={"inherit"}>
                                    <Title/>
                                </Chakra.Heading>
                            </Chakra.Box>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            colSpan={{
                                base: 4,
                                lg: 3
                            }}
                        >
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
                    <Chakra.Grid
                        templateColumns={"repeat(12, 1fr)"}
                    >
                        <Chakra.GridItem
                            colSpan={{
                                base: 1,
                                sm: 1,
                                md: 1,
                                lg: 1
                            }}
                        >
                            <Chakra.Center>
                                <React.Suspense
                                    fallback={
                                        <MangadexSpinner size={"md"} />
                                    }
                                >
                                    <ChapterDownloadButton chapter={props.chapter} />
                                </React.Suspense>
                            </Chakra.Center>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            colSpan={{
                                base: 7,
                                lg: 8
                            }}
                        >
                            <Chakra.Wrap>
                                <Groups/>
                            </Chakra.Wrap>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            colSpan={{
                                base: 4,
                                lg: 3
                            }}
                        >
                            <TryCatch catch={() => (<Chakra.Text as={"i"}>No user, i guess</Chakra.Text>)}>
                                <User/>
                            </TryCatch>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </ChapterContextMenu>
        </ChapterPropsProvider>
    );
}
