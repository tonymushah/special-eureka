import TryCatch from "@/commons-res/components/TryCatch";
import * as Chakra from "@chakra-ui/react";
import HTTPClientProvider_Query from "@commons-res/components/HTTPClientProvider_Query";
import { User } from "@mangadex/api/structures/User";
import UserPage from "@mangadex/pages/user";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "swiper/css/bundle";
import monka from "./test-data/user/63849d8f-2eb3-457f-bb90-0e1f7d43588b.json";


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
const queryClient = new QueryClient({
    "defaultOptions": {
        "queries": {
            "staleTime": Infinity
        }
    }
});

const testUser = User.build_wANY(monka.data);

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
                onError={() => (
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
                        <Chakra.Spinner />
                    }>
                        <UserPage user={testUser} />
                    </React.Suspense>
                </TryCatch>
            </HTTPClientProvider_Query>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
);


