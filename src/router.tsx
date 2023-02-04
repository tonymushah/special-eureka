import React from "react";
import Index_Page from "./index_page";
import { Await, createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Mangadex from "./mangadex/index";
import { getClient } from "@tauri-apps/api/http";

const NotFound404 = React.lazy(() => import("./commons-res/404NotFound"));
const HTTPClientProvider_Client = React.lazy(() => import("./commons-res/components/HTTPClientProvider_Query"));

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

    const All_Routes: RouteObject = {
        "path": "/",
        "element": <Index_Page />,
    }
    
    const router = createBrowserRouter(
        [
            All_Routes,
            Mangadex,
            {
                path : "*",
                element : (
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
            <NotFound404/>
        </React.Suspense>
                )
            }
        ]
    )
    const queryClient = new QueryClient({
        "defaultOptions": {
            "queries": {
                "cacheTime": 1000 * 30,
                retry(failureCount, error) {
                    if (failureCount >= 3) {
                        return false
                    } else {
                        return true;
                    }
                },
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
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools
                    position={"bottom-right"}
                    initialIsOpen={false}
                />
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
                    <HTTPClientProvider_Client
                        value={HTTPClient}
                        onLoading={
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
                        onError={(error) => (
                            <Chakra.Box
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
                            </Chakra.Box>
                        )}
                    >
                        <React.Fragment>
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
                        </React.Fragment>
                    </HTTPClientProvider_Client>
                </React.Suspense>
            </QueryClientProvider>
        </React.Suspense>

    )
}
