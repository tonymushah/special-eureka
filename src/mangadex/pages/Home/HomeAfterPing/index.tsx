import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { queryfn } from "./queryfn";
import { queryKey } from "./queryKey";

const Seasonal = React.lazy(() => import("../Seasonal"));
const Latest_Updates = React.lazy(() => import("../Latest_Update"));
const RecentlyAdded = React.lazy(() => import("../RecentlyAdded"));
const PopularRecently = React.lazy(() => import("../PopularTitles"));

export default function HomeAfterPing() {
    const client = useHTTPClient();
    /// [x] Refactor Query Key into a function
    const queryKey_ = React.useMemo(() => queryKey(), []);
    const queryClient = useQueryClient();
    const query = useQuery(queryKey_, queryfn(client, queryClient));
    if (query.isSuccess) {
        return (
            <React.Suspense fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <Chakra.HStack>
                            <MangadexSpinner
                                size={"lg"}
                                thickness="5px"
                            />
                            <Chakra.Heading size={"lg"} fontFamily={"inherit"} >
                                Fetching all home page data...
                            </Chakra.Heading>
                        </Chakra.HStack>
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            }>
                <Chakra.VStack
                    display={"block"}
                    divider={<Chakra.StackDivider />}
                >
                    <Chakra.Box display={"block"}>

                        <PopularRecently />

                    </Chakra.Box>
                    <Chakra.Box display={"block"}>

                        <Seasonal />
                    </Chakra.Box>
                    <Chakra.Box
                        display={"block"}
                    >

                        <Latest_Updates />
                    </Chakra.Box>
                    <Chakra.Box
                        display={"block"}
                    >

                        <RecentlyAdded />
                    </Chakra.Box>
                </Chakra.VStack>
            </React.Suspense>
        );
    }
    if (query.isError) {
        return (
            <ChakraContainer>
                <Chakra.Heading fontFamily={"inherit"}>
                    Error on loading the home page
                </Chakra.Heading>
            </ChakraContainer>
        );
    }
    return (
        <Chakra.AbsoluteCenter>
            <Chakra.Box>
                <Chakra.HStack>
                    <MangadexSpinner
                        size={"lg"}
                        thickness="5px"
                    />
                    <Chakra.Heading size={"lg"} fontFamily={"inherit"} >
                        Fetching all home page data...
                    </Chakra.Heading>
                </Chakra.HStack>
            </Chakra.Box>
        </Chakra.AbsoluteCenter>
    );
}
