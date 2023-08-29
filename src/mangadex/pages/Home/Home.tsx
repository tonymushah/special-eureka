import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense, useTrackEvent } from "@mangadex/index";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { LoaderFunction } from "react-router";

const HomePageAfterPing = React.lazy(() => import("@mangadex/pages/Home/HomeAfterPing"));
const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OnSuccess(_query: UseQueryResult<boolean, Error>) {
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.HStack>
                            <MangadexSpinner
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
    );
}

function OnError(query: UseQueryResult<boolean, Error>) {
    return (
        <Mangadex_suspense>
            <IsPingable_defaultError
                query={query}
            />
        </Mangadex_suspense>
    );
}

function Home() {
    const client = useHTTPClient();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("High Quality Image, no ads | Mangadex");
    }, []);
    useTrackEvent("mangadex-index-page-entrance");
    return (
        <Chakra.Box
            margin={2}
        >
            <React.Suspense
                fallback={
                    <Chakra.AbsoluteCenter>
                        <MangadexSpinner
                            size={"lg"}
                        />
                    </Chakra.AbsoluteCenter>
                }
            >
                <IsPingable
                    client={client}
                    onError={OnError}
                    onLoading={
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box>
                                <Chakra.HStack>
                                    <MangadexSpinner
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
                    onSuccess={OnSuccess}
                />
            </React.Suspense>
        </Chakra.Box>
    );
}

export default Home;

export const loader : LoaderFunction = async function () {
    return new Response();
};