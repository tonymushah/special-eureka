import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";

const HomePageAfterPing = React.lazy(() => import("@mangadex/pages/Home/HomeAfterPing"));
const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));

function Home() {
    const client = useHTTPClient();
    useAppWindowTitle("High Quality Image, no ads | Mangadex");
    useTrackEvent("mangadex-index-page-entrance");
    return (
        <Chakra.Box
            margin={2}
        >
            <React.Suspense
                fallback={
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner
                            size={"lg"}
                        />
                    </Chakra.AbsoluteCenter>
                }
            >
                <IsPingable
                    client={client}
                    onError={(query) => (
                        <Mangadex_suspense>
                            <IsPingable_defaultError
                                query={query}
                            />
                        </Mangadex_suspense>
                    )}
                    onLoading={
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box>
                                <Chakra.HStack>
                                    <Chakra.Spinner
                                        size={"lg"}
                                        thickness={"5px"}
                                    />
                                    <Chakra.Heading size={"lg"} fontFamily={"inherit"} >
                                        Pinging the Mangadex API
                                    </Chakra.Heading>
                                </Chakra.HStack>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    }
                    onSuccess={() => (
                        <React.Suspense
                            fallback={
                                <Chakra.AbsoluteCenter>
                                    <Chakra.Box>
                                        <Chakra.HStack>
                                            <Chakra.Spinner
                                                size={"lg"}
                                                thickness="5px"
                                            />
                                            <Chakra.Heading size={"lg"} fontFamily={"inherit"} >
                                                Pinging the Mangadex API
                                            </Chakra.Heading>
                                        </Chakra.HStack>
                                    </Chakra.Box>
                                </Chakra.AbsoluteCenter>
                            }
                        >
                            <HomePageAfterPing />
                        </React.Suspense>
                    )}
                />
            </React.Suspense>
        </Chakra.Box>

    );
}



export default Home;

