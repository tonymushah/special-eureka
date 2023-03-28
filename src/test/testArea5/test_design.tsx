import { ExtLink } from "@/commons-res/components/ExtLink";
import { useHTTPClient } from "@/commons-res/components/HTTPClientProvider";
import TryCatch from "@/commons-res/components/TryCatch";
import { get_MangaChapter_Accordions_byChapterArray, Offset_limits } from "@mangadex/api/internal/Utils";
import MangaChapter_Accordion from "@mangadex/api/internal/utils/MangaChapter_Accordion";
import { Attribute } from "@mangadex/api/structures/Attributes";
import { Chapter, Chapter_withAllIncludes } from "@/mangadex/api/structures/Chapter";
import { Group } from "@mangadex/api/structures/Group";
import CollectionComponnent_WithQuery from "@/mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import Group_Simple_Element_ByID from "@/mangadex/resources/componnents/groups/Group_Simple_Element_byID";
import MangaChapterAccordion_Element from "@/mangadex/resources/componnents/mangas/v1/MangaChapterAccordion_Element";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Box, Heading, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import HTTPClientProvider_Query from "@commons-res/components/HTTPClientProvider_Query";
import { getLogo } from "@mangadex";
import { User } from "@mangadex/api/structures/User";
import { getClient } from "@tauri-apps/api/http";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import ReactDOM from "react-dom/client";
import { hashQueryKey, QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { To } from "react-router";
import "swiper/css/bundle";
import monka from "./test-data/user/63849d8f-2eb3-457f-bb90-0e1f7d43588b.json";

type UserPage_Links = {
    title: string,
    link_to: To,
    tabPanelChildren: React.ReactNode,
    key?: React.Key
}

function getUserFeedQueryKey(props: {
    user_id: string
}) {
    return `mdx-user:${props.user_id}-feed`;
}

function getUserFeedQuery(props: {
    user_id: string
}) {
    const client = useHTTPClient();
    const queryKey = getUserFeedQueryKey(props);
    const query = useQuery(queryKey, () => {
        return Chapter.search({
            client: client,
            "uploader": props.user_id,
            offset_limits: new Offset_limits()
        });
    });
    return {
        queryKey,
        query
    };
}

function UserGroups(props: {
    user: User
}) {
    const groups: Attribute[] = props.user.get_some_relationship("scanlation_group");
    return (
        <Box>
            <Wrap>
                {
                    groups.map((value) => (
                        <WrapItem
                            key={value.get_id()}>
                            <Group_Simple_Element_ByID
                                id={value.get_id()}
                            />
                        </WrapItem>
                    ))
                }
            </Wrap>
        </Box>
    );
}

function UserUploadsNumber(props: {
    user_id: string
}) {
    const { query } = getUserFeedQuery(props);
    if (query.isSuccess) {
        return (
            <React.Fragment>
                {
                    query.data.get_total()
                }
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                Loading...
            </React.Fragment>
        );
    }
}


function UserPageInfo(props: {
    user: User
}) {

    return (
        <Box>
            <ExtLink
                href={`https://mangadex.org/user/${props.user.get_id()}`}
            >
                <Chakra.Button colorScheme={"orange"} rightIcon={<ExternalLinkIcon />}>
                    Open on Mangadex
                </Chakra.Button>
            </ExtLink>
            <Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Uploads : <UserUploadsNumber user_id={props.user.get_id()} /></Chakra.Heading>
            </Box>
            <Box>
                <Chakra.HStack>
                    <Heading fontFamily={"inherit"} size={"md"}>Roles : </Heading>
                    {
                        props.user.get_roles().map((value) => (
                            <Chakra.Tag key={hashQueryKey(value)}>{value}</Chakra.Tag>
                        ))
                    }
                </Chakra.HStack>
            </Box>
            <Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Groups</Chakra.Heading>
                <UserGroups
                    {...props}
                />
            </Box>
        </Box>
    );
}

function UserFeed(props : {
    user_id : string
}){
    const client = useHTTPClient();
    const queryKey = getUserFeedQueryKey(props);
    return (
        <Box>
            <CollectionComponnent_WithQuery<Chapter>
                fn={() => {
                    const offset_limits = new Offset_limits();
                    offset_limits.set_limits(25);
                    return Chapter_withAllIncludes.search({
                        client: client,
                        "uploader": props.user_id,
                        offset_limits: offset_limits
                    });
                }}
                queryKey={queryKey}
            >
                {(value) => {
                    const chapter_accordion = get_MangaChapter_Accordions_byChapterArray(value.get_data());
                    return (
                        <Chakra.Box>
                            {
                                chapter_accordion.map((value_) => (
                                    <Chakra.Box key={value_.$mangaid}
                                        m={2}
                                    >
                                        <MangaChapterAccordion_Element src={value_} />
                                    </Chakra.Box>
                                ))
                            }
                        </Chakra.Box>
                    );
                }}
            </CollectionComponnent_WithQuery>
        </Box>
    );
}

function UserPage(props: React.PropsWithChildren<{
    user: User
}>) {
    const links: UserPage_Links[] = [
        {
            title: "User Information",
            "link_to": "/",
            tabPanelChildren: (
                <UserPageInfo {...props} />
            ),
            key: "user-inf"
        },
        {
            title: "Feed",
            "link_to": "/",
            tabPanelChildren: (
                <React.Fragment>
                    <UserFeed user_id={props.user.get_id()}/>
                </React.Fragment>
            ),
            key: "user-feed"
        }
    ];
    React.useEffect(() => {
        appWindow.setTitle(`${props.user.get_username()} | Mangadex`);
    }, [
        props.user
    ]);
    return (
        <Chakra.Box>
            <Chakra.Box bg={"#d5d4d4"} p={4}>
                <Chakra.Heading fontFamily={"inherit"}>{props.user.get_username()}</Chakra.Heading>
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


