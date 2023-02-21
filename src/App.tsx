import * as Chakra from "@chakra-ui/react";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import TryCatch from "./commons-res/components/TryCatch";
import "/commons-res/bootstrap.css";
import "/commons-res/fontawesome-free-6.1.2-web/css/all.css";

const Close_splashscreen = React.lazy(() => import("./splashscreen/Close_splashscreen"));
//const Navigator = React.lazy(() => import("./commons-res/components/Navigator_Default"));
const Router = React.lazy(() => import("./router"));
const HTTPClientProvider_Client = React.lazy(() => import("./commons-res/components/HTTPClientProvider_Query"));

export default function App() {
    const HTTPClient = getClient();
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
    return (
        <Chakra.Box
            fontFamily={"Poppins"}
        >
            <TryCatch
                catch={(error: Error) => (
                    <Chakra.Box
                        width={"full"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box textAlign={"center"}>
                                <Chakra.Heading>Error on loading the app</Chakra.Heading>
                                <Chakra.Text>Error Details</Chakra.Text>
                                <Chakra.Alert status="error">
                                    <Chakra.AlertIcon />
                                    <Chakra.AlertTitle>{error.name}</Chakra.AlertTitle>
                                    <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
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
                            <React.Suspense
                                fallback={
                                    <Chakra.Box width={"100%"} height={"100vh"}>
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
                                <Router />
                            </React.Suspense>
                        </HTTPClientProvider_Client>
                    </React.Suspense>
                </QueryClientProvider>
            </TryCatch>
            <React.Suspense>
                <Close_splashscreen />
            </React.Suspense>
        </Chakra.Box>
    );
}