import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { List } from "@mangadex/api/structures/List";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { loader as latest, queryKey as latest_QueryKey } from "./Latest_Update";
import { loader as popular, queryKey as popular_QueryKey } from "./PopularTitles";
import { loader as recentlyAdded, queryKey as recentlyAdded_QueryKey } from "./RecentlyAdded";
import { getSeasonalId } from "./Seasonal";

const Seasonal = React.lazy(() => import("./Seasonal"));
const Latest_Updates = React.lazy(() => import("./Latest_Update"));
const RecentlyAdded = React.lazy(() => import("./RecentlyAdded"));
const PopularRecently = React.lazy(() => import("./PopularTitles"));

async function latest_loader(client: Client, queryClient: QueryClient) {
    const data = await latest({
        client,
        queryClient
    });
    queryClient.setQueryData(latest_QueryKey, data);
}

async function popular_loader(client: Client, queryClient: QueryClient) {
    const data = await popular({
        client
    });
    queryClient.setQueryData(popular_QueryKey, data);
}

async function recentlyAdded_loader(client: Client, queryClient: QueryClient) {
    const data = await recentlyAdded({
        client
    });
    queryClient.setQueryData(recentlyAdded_QueryKey, data);
}

async function seasonal_loader(client: Client, queryClient: QueryClient) {
    const seasonal_id = await getSeasonalId(client);
    queryClient.setQueryData(["mdx", "seasonal", "id"], seasonal_id);
    const data = await List.getListByID_includes_manga(seasonal_id, client);
    const key = ["mdx", "custom_list", seasonal_id];
    queryClient.setQueryData(key, data);
}

export default function HomeAfterPing() {
    const client = useHTTPClient();
    
    const queryKey = ["mdx", "home", "page", "loader"];
    const queryClient = useQueryClient();
    const query = useQuery(queryKey, async () => {
        return (await Promise.allSettled([
            latest_loader(client, queryClient),
            popular_loader(client, queryClient),
            recentlyAdded_loader(client, queryClient),
            seasonal_loader(client, queryClient),
        ]));
    });
    if (query.isSuccess) {
        return (
            <Chakra.VStack
                display={"block"}
                divider={<Chakra.StackDivider/>}
            >
                <Chakra.Box display={"block"}>
                    <React.Suspense
                        fallback={<Chakra.Box >
                            <Chakra.Center>
                                <Chakra.Spinner
                                    size={"xl"}
                                />
                            </Chakra.Center>
                        </Chakra.Box>}
                    >
                        <PopularRecently />
                    </React.Suspense>
                    
                </Chakra.Box>
                <Chakra.Box display={"block"}>
                    <React.Suspense
                        fallback={<Chakra.Box >
                            <Chakra.Center>
                                <Chakra.Spinner
                                    size={"xl"}
                                />
                            </Chakra.Center>
                        </Chakra.Box>}
                    >
                        <Seasonal />
                    </React.Suspense>
                </Chakra.Box>
                <Chakra.Box
                    display={"block"}
                >
                    <React.Suspense
                        fallback={<Chakra.Box >
                            <Chakra.Center>
                                <Chakra.Spinner
                                    size={"xl"}
                                />
                            </Chakra.Center>
                        </Chakra.Box>}
                    >
                        <Latest_Updates />
                    </React.Suspense>
                </Chakra.Box>
                <Chakra.Box
                    display={"block"}
                >
                    <React.Suspense
                        fallback={<Chakra.Box >
                            <Chakra.Center>
                                <Chakra.Spinner
                                    size={"xl"}
                                />
                            </Chakra.Center>
                        </Chakra.Box>}
                    >
                        <RecentlyAdded />
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.VStack>
        );
    }
    if(query.isError){
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
                    <Chakra.Spinner
                        size={"lg"}
                    />
                    <Chakra.Text as={"span"} >
                        Fetching all home page data...
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        </Chakra.AbsoluteCenter>
    );
}
