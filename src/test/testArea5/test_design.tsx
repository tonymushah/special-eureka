import TryCatch from "@/commons-res/components/TryCatch";
import * as Chakra from "@chakra-ui/react";
import HTTPClientProvider_Query from "@commons-res/components/HTTPClientProvider_Query";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "swiper/css/bundle";

const SelectLanguage = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"))
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
const queryClient = new QueryClient()

test_area.render(
    <Chakra.ChakraProvider>
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools />
            <HTTPClientProvider_Query
                value={getClient()}
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
                            <Chakra.Box >
                                <Chakra.Alert>
                                    <Chakra.AlertIcon />
                                    <Chakra.AlertTitle>Error on Loading HTTPClient</Chakra.AlertTitle>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
            >
                <TryCatch
                    catch={(error) => (
                        <Chakra.Alert status="error">
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>{error.name}</Chakra.AlertTitle>
                            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                >
                    <React.Suspense fallback={
                        <Chakra.Spinner/>
                    }>
                        <SelectLanguage />
                    </React.Suspense>
                </TryCatch>

            </HTTPClientProvider_Query>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
)


