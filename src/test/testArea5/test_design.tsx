import TryCatch from "@/commons-res/components/TryCatch";
import { User } from "@mangadex/api/structures/User";
import * as Chakra from "@chakra-ui/react";
import HTTPClientProvider_Query from "@commons-res/components/HTTPClientProvider_Query";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "swiper/css/bundle";
import monka from "./test-data/user/63849d8f-2eb3-457f-bb90-0e1f7d43588b.json";
import { Col, Row } from "react-bootstrap";
import { To } from "react-router";

type UserPage_Links = {
    title : string,
    link_to : To,
    tabPanelChildren : React.ReactNode,
    key? : React.Key
}

function UserPage(props: React.PropsWithChildren<{
    user: User
}>) {
    const links : UserPage_Links[] = [
        {
            title : "User Information",
            "link_to" : "/",
            tabPanelChildren : (
                <React.Fragment>
                    <Chakra.Text>
                        Tempor culpa eiusmod in et laboris cillum.
                    </Chakra.Text>
                    <Chakra.Text>
                        Ea do commodo elit nulla voluptate dolor non. Lorem culpa consectetur consequat dolor incididunt. Nulla aliquip cupidatat quis ut ex nulla incididunt irure cupidatat exercitation. Culpa eu mollit voluptate minim magna cupidatat eu commodo Lorem in pariatur. Elit ad nisi nulla incididunt voluptate velit enim sit. Labore irure aliqua culpa exercitation. Aute ipsum excepteur irure ex eu.
                    </Chakra.Text>
                </React.Fragment>
            ),
            key : "user-inf"
        },
        {
            title : "Feed",
            "link_to" : "/",
            tabPanelChildren : (
                <React.Fragment>
                    
                </React.Fragment>
            ),
            key : "user-feed"
        }
    ];
    return (
        <Chakra.Box>
            <Chakra.Box bg={"#d5d4d4"} p={4}>
                <Chakra.Heading>{props.user.get_username()}</Chakra.Heading>
            </Chakra.Box>
            <Chakra.Box>
                <Chakra.Tabs
                    variant={"enclosed"}
                >
                    <Chakra.TabList>
                        {links.map((value) => (
                            <Chakra.Tab key={value.key}>{value.title}</Chakra.Tab>
                        ))}
                    </Chakra.TabList>
                    <Chakra.TabPanels>
                        {links.map((value) => (
                            <Chakra.TabPanel key={value.key}>{
                                value.tabPanelChildren
                            }</Chakra.TabPanel>
                        ))}
                    </Chakra.TabPanels>
                </Chakra.Tabs>
            </Chakra.Box>
        </Chakra.Box>
    );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
const queryClient = new QueryClient();

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


