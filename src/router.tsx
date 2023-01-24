import React from "react";
import Index_Page from "./index_page";
import { Await, createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Mangadex from "./mangadex/index";
import { Client, getClient } from "@tauri-apps/api/http";

const HTTPClientProvider = React.lazy(() => import("./commons-res/components/HTTPClientProvider"))

function Close_splashscreen() {
    return (
        <React.Suspense>
            <Await
                resolve={invoke("close_splashscreen")}
            >
            </Await>
        </React.Suspense>
    );
}

export default function Router() {

    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

    const All_Routes: RouteObject = {
        "path": "/",
        "element": <Index_Page />,
    }

    const RouterList = [
        "./mangadex/index"
    ]
    const router = createBrowserRouter(
        [
            All_Routes,
            Mangadex
        ]
    )
    const queryClient = new QueryClient({
        "defaultOptions": {
            "queries": {
                "cacheTime": 1000 * 60 * 2
            }
        }
    });
    const HTTPClient = getClient();
    return (
        <React.Suspense
            fallback={
                <Chakra.Box
                    width={"100%"}
                    height={"100vh"}
                >
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.AbsoluteCenter>
                </Chakra.Box>
            }
        >
            <Await
                resolve={HTTPClient}
                errorElement={<Chakra.Box
                    width={"100%"}
                    height={"100vh"}
                >
                    <Chakra.AbsoluteCenter>
                        <Chakra.Box>
                            <Chakra.Alert>
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>Error on Loading HTTPClient</Chakra.AlertTitle>
                            </Chakra.Alert>
                        </Chakra.Box>
                    </Chakra.AbsoluteCenter>
                </Chakra.Box>}
            >
                {
                    (client: Client) => (
                        <React.Suspense
                            fallback={
                                <Chakra.Box
                                    width={"100%"}
                                    height={"100vh"}
                                >
                                    <Chakra.AbsoluteCenter>
                                        <Chakra.Spinner
                                            size="xl"
                                            color='orange.500'
                                            thickness='4px'
                                        />
                                    </Chakra.AbsoluteCenter>
                                </Chakra.Box>
                            }
                        >
                            <HTTPClientProvider
                                value={client}
                            >
                                <QueryClientProvider client={queryClient}>
                                    <ReactQueryDevtools
                                        position={"bottom-right"}
                                        initialIsOpen={false}
                                    />
                                    <RouterProvider
                                        router={router}
                                        fallbackElement={
                                            <Chakra.Box
                                                width={"100%"}
                                                height={"100vh"}
                                            >
                                                <Chakra.AbsoluteCenter>
                                                    <Chakra.Spinner
                                                        size="xl"
                                                        color='orange.500'
                                                        thickness='4px'
                                                    />
                                                </Chakra.AbsoluteCenter>
                                            </Chakra.Box>
                                        }
                                    />
                                    <Close_splashscreen />
                                </QueryClientProvider>
                            </HTTPClientProvider>
                        </React.Suspense>
                    )
                }
            </Await>
        </React.Suspense>

    )
}
