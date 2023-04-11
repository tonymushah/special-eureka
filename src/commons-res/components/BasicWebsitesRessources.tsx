import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Chakra from "@chakra-ui/react";
import { Client, getClient } from "@tauri-apps/api/http";
import { trackEvent } from "@aptabase/tauri";

const HTTPClientProvider_Client = React.lazy(() => import("@commons-res/components/HTTPClientProvider_Query"));

const NavigatorReactRouter = React.lazy(() => import("@commons-res/components/NavigatorReactRouter"));

function ThisLoading() {
    return (
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
    );
}

function ThisSuspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <ThisLoading />
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

export default function BasicWebsitesRessources(props: React.PropsWithChildren<{
    client? : () => Promise<Client>,
    queryClient? : QueryClient
}>) {
    const HTTPClient = props.client != undefined ? props.client() : getClient();
    const queryClient = props.queryClient ?? new QueryClient({
        "defaultOptions": {
            "queries": {
                "cacheTime": 1000 * 30,
                retry(failureCount) {
                    if (failureCount >= 3) {
                        return false;
                    } else {
                        return true;
                    }
                },
                onError(e){
                    if(typeof e == "string"){
                        trackEvent("special-eureka-query-error", {
                            location : location.href,
                            error : e
                        });
                    }else if(typeof e == "object"){
                        if(e instanceof Error){
                            trackEvent("special-eureka-query-error", {
                                location : location.href,
                                "error-message" : e.message,
                                "error-name" : e.name
                            });
                        }
                    }
                    
                }
            },
        }
    });
    React.useEffect(() => {
        return () => {
            queryClient.unmount();
        };
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                position={"bottom-right"}
                initialIsOpen={false}
            />
            <ThisSuspense>
                <HTTPClientProvider_Client
                    value={HTTPClient}
                    onLoading={
                        <ThisLoading />
                    }
                    onError={() => (
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
                    <NavigatorReactRouter>
                        {
                            props.children
                        }
                    </NavigatorReactRouter>
                </HTTPClientProvider_Client>
            </ThisSuspense>
        </QueryClientProvider>
    );
}