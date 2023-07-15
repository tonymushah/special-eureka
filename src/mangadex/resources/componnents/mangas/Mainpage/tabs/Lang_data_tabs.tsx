import { Box, Center, Link, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import TryCatch from "@commons-res/components/TryCatch";
import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import ErrorEL1 from "../../../error/ErrorEL1";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const ReactMarkDown = React.lazy(() => import("react-markdown"));
const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

type LAD_TabsProps = {
    src: Array<Lang_and_Data>
    id?: string
    transition?: boolean
}

export function LAD_Tabs(props: LAD_TabsProps) {
    return (
        <Tabs orientation="vertical">
            <TabList>
                {
                    props.src.map((getted: Lang_and_Data) => (
                        <Tab key={getted.get_language().get_three_letter()}>
                            {getted.get_language().get_name()}
                        </Tab>
                    ))
                }
            </TabList>
            <TabPanels>
                {
                    props.src.map((getted: Lang_and_Data) => (
                        <TabPanel key={`${getted.get_language().get_three_letter()}-data`}>
                            <React.Suspense
                                fallback={<Box
                                    width={"full"}
                                >
                                    <Center>
                                        <MangadexSpinner />
                                    </Center>
                                </Box>}
                            >
                                <TryCatch
                                    catch={(e) => (
                                        <ErrorEL1 error={e} />
                                    )}
                                >
                                    <ReactMarkDown
                                        components={{
                                            a(node) {
                                                return (
                                                    <React.Suspense
                                                        fallback={<Skeleton width={"10px"} height={"10px"} />}
                                                    >
                                                        {
                                                            node.href == undefined ? (
                                                                <Link>{node.children}</Link>
                                                            ) : (
                                                                <ExtLink href={node.href}>
                                                                    <Link>{node.children}</Link>
                                                                </ExtLink>
                                                            )
                                                        }
                                                    </React.Suspense>
                                                );
                                            }
                                        }}
                                    >
                                        {getted.get_data()}
                                    </ReactMarkDown>
                                </TryCatch>
                            </React.Suspense>
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </Tabs>
    );
}
