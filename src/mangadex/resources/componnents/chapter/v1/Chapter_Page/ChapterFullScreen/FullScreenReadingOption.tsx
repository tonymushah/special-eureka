import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { motion } from "framer-motion";
import React from "react";

//const Chapter_Reading_mode = React.lazy(() => import("../ChapterReadingMode"));

const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));

const Chapter_Previous_Next = React.lazy(() => import("../Chapter_Previous_Next"));

const PageSelection = React.lazy(() => import("../PageSelection"));

const ImageWidthSlider = React.lazy(() => import("./ImageWidthSlider"));

export default function FullScreenReadingOption({ isOpen, getDisclosureProps, hidden, setHidden, chapter }: {
    isOpen: boolean,
    getDisclosureProps: (props?: any) => any,
    hidden: boolean,
    setHidden: (d: boolean) => void,
    chapter: Chapter
}) {
    const client = useHTTPClient();
    return (
        <div>
            <motion.div
                {...getDisclosureProps()}
                hidden={hidden}
                initial={false}
                onAnimationStart={() => setHidden(false)}
                onAnimationComplete={() => setHidden(!isOpen)}
                animate={{ width: isOpen ? 300 : 0 }}
                style={{
                    background: "#d8d8d8",
                    borderColor: "black",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    right: "0",
                    height: "100vh",
                    top: "0",
                    padding: "15px"
                }}
            >
                <Chakra.Heading size={"md"}
                    fontFamily={"inherit"}
                >
                    Reading Option
                </Chakra.Heading>
                <Chakra.Box>
                    <Chakra.Box>
                        Navigation :
                        &nbsp;
                        <React.Suspense
                            fallback={<MangadexSpinner />}
                        >
                            <IsPingable
                                client={client}
                                onError={(query) => (
                                    <Chakra.Button
                                        colorScheme={"orange"}
                                        onClick={() => query.refetch()}
                                    >
                                        Refresh
                                    </Chakra.Button>
                                )}
                                onLoading={
                                    <MangadexSpinner />
                                }
                                onSuccess={() => (
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Center>
                                                <MangadexSpinner />
                                            </Chakra.Center>
                                        }
                                    >
                                        <Chapter_Previous_Next
                                            src={chapter!}
                                        />
                                    </React.Suspense>
                                )}
                            />
                        </React.Suspense>
                    </Chakra.Box>
                    <Chakra.Stack
                        mt={3}
                        spacing={"2px"}
                        direction="column"
                    >
                        <React.Suspense>
                            <ImageWidthSlider />
                        </React.Suspense>
                    </Chakra.Stack>
                    {/*<Chakra.Box
                        marginTop={10}
                    >
                        <Chakra.Text p={0} m={0}>Chapter Reading mode</Chakra.Text>
                        <React.Suspense
                            fallback={
                                <Chakra.Center>
                                    <MangadexSpinner />
                                </Chakra.Center>
                            }
                        >
                            <Chapter_Reading_mode chapterID={chapter.get_id()} />
                        </React.Suspense>
                    </Chakra.Box>*/}

                    <Chakra.Text mt={3} mb={0}>
                        Select a page
                    </Chakra.Text>
                    <React.Suspense
                        fallback={<MangadexSpinner/>}
                    >
                        <PageSelection chapter={chapter} />
                    </React.Suspense>
                </Chakra.Box>
            </motion.div>

        </div>
    );
}