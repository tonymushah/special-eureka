import * as Chakra from "@chakra-ui/react";
import { List } from "@mangadex/api/structures/List";
import { Client } from "@tauri-apps/api/http";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Row } from "react-bootstrap";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Mangadex_suspense } from "@mangadex";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { loader as latest, queryKey as latest_QueryKey } from "./Latest_Update";
import { loader as popular, queryKey as popular_QueryKey } from "./PopularTitles";
import { loader as recentlyAdded, queryKey as recentlyAdded_QueryKey } from "./RecentlyAdded";
import { getSeasonalId } from "./Seasonal";

const Seasonal = React.lazy(() => import("./Seasonal"));
const Latest_Updates = React.lazy(() => import("./Latest_Update"));
const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_defaultError"));
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
    const seasonal_id = getSeasonalId();
    const data = await List.getListByID_includes_manga(seasonal_id, client);
    const key = "mdx-custom_list:" + seasonal_id;
    queryClient.setQueryData(key, data);
}

function Home() {
    const client = useHTTPClient();
    appWindow.setTitle("High Quality Image, no ads | Mangadex");
    const queryKey = "mdx-home-page-loader";
    const queryClient = useQueryClient();
    const query = useQuery(queryKey, async () => {
        await Promise.allSettled([
            latest_loader(client, queryClient),
            popular_loader(client, queryClient),
            recentlyAdded_loader(client, queryClient),
            seasonal_loader(client, queryClient)
        ]);
    });
    if (query.isSuccess) {
        return (
            <Chakra.Box
                margin={2}
            >
                <React.Suspense
                    fallback={
                        <Chakra.Container
                            centerContent
                            height={"full"}
                        >
                            <Chakra.Spinner
                                size={"lg"}
                            />
                        </Chakra.Container>
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
                                <Chakra.Spinner
                                    size={"lg"}
                                />
                            </Chakra.AbsoluteCenter>
                        }
                        onSuccess={() => (
                            <React.Fragment>
                                <Row className='d-block'>
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
                                </Row>
                                <Chakra.Divider />
                                <Row
                                    className='d-block'
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
                                </Row>
                                <Row
                                    className='d-block'
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
                                </Row>
                            </React.Fragment>
                        )}
                    />
                </React.Suspense>
            </Chakra.Box>

        );
    }

    return (
        <Chakra.Container
            centerContent
            height={"full"}
        >
            <Chakra.Spinner
                size={"lg"}
            />
        </Chakra.Container>
    );
}
export default Home;

