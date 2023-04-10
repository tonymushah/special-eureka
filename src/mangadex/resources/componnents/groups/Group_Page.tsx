import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Container, Stack } from "react-bootstrap";
import {
    useQuery
} from "@tanstack/react-query";
import { Group } from "@mangadex/api/structures/Group";
import WaveHaikei from "./wave-haikei-1.svg";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Client } from "@tauri-apps/api/http";
import TryCatch from "@commons-res/components/TryCatch";
import { appWindow } from "@tauri-apps/api/window";

const IsPingable = React.lazy(() => import("../IsPingable"));
const Group_Details = React.lazy(() => import("./Group_Details"));
const Group_Feeds = React.lazy(() => import("./Group_Feeds"));
const Group_Titles = React.lazy(() => import("./Group_Titles"));

function Group_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Box>
                    <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

function Leader_query_for_GroupPage(props: {
    src: Group,
    client: Client
}) {
    const leader_queryKey = ["mdx", "user", props.src.getLeaderID()];
    const leader_query = useQuery(leader_queryKey, () => {
        return props.src.getLeader(props.client);
    }, {
        staleTime: Infinity
    });
    return (
        <>
            {
                leader_query.isSuccess ? (
                    <Chakra.Heading fontSize={"lg"}>Leader : <Chakra.Link>{leader_query.data.get_username()}</Chakra.Link></Chakra.Heading>
                ) : (
                    <></>
                )
            }</>
    );
}

export default function Group_Page(props: React.PropsWithChildren<{
    src: Group
}>) {
    const client = useHTTPClient();
    appWindow.setTitle(`${props.src.get_name()} | Mangadex`).then();
    return (
        <Chakra.Box>
            <Chakra.Box
                height={"sm"}
                backgroundImage={WaveHaikei}
                backgroundPosition={"bottom"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                <Chakra.Center height={"full"}>
                    <Chakra.Box textAlign={"center"}>
                        <Chakra.Heading fontFamily={"inherit"}>{props.src.get_name()}</Chakra.Heading>
                        <React.Suspense
                            fallback={
                                <Chakra.Text>Loading...</Chakra.Text>
                            }
                        >
                            <IsPingable
                                onLoading={
                                    <Chakra.Text>Loading...</Chakra.Text>
                                }
                                onSuccess={(query) => (
                                    <TryCatch
                                        catch={(error) => (
                                            <Chakra.Heading fontSize={"lg"} fontFamily={"inherit"}>Leader : None</Chakra.Heading>
                                        )}
                                    >
                                        <Leader_query_for_GroupPage
                                            src={props.src}
                                            client={client}
                                        />
                                    </TryCatch>
                                )}
                                onError={(query) => (
                                    <Chakra.Box>
                                        <Chakra.Button
                                            onClick={() => query.refetch()}
                                            colorScheme={"orange"}
                                        >
                                            Refretch
                                        </Chakra.Button>
                                    </Chakra.Box>
                                )}
                                client={client}
                            />
                        </React.Suspense>
                    </Chakra.Box>
                </Chakra.Center>
            </Chakra.Box>
            <Chakra.Box
                background={"gray.200"}
            >
                <Container>
                    <Chakra.Tabs isLazy>
                        <Chakra.TabList>
                            <Chakra.Tab>Group Details</Chakra.Tab>
                            <Chakra.Tab>Titles</Chakra.Tab>
                            <Chakra.Tab>Feed</Chakra.Tab>
                        </Chakra.TabList>
                        <Chakra.TabPanels>
                            <Chakra.TabPanel>
                                <Group_Page_Suspense>
                                    <Group_Details src={props.src} />
                                </Group_Page_Suspense>
                            </Chakra.TabPanel>
                            <Chakra.TabPanel>
                                <TryCatch
                                    catch={(error) => (
                                        <Chakra.Alert
                                            status="error"
                                            flexDirection='column'
                                            alignItems='center'
                                            justifyContent='center'
                                            textAlign='center'
                                            height={"max-content"}
                                        >
                                            <Chakra.AlertIcon />
                                            <Chakra.AlertTitle>
                                                {
                                                    error.name
                                                }
                                            </Chakra.AlertTitle>
                                            <Chakra.AlertDescription>
                                                <Stack
                                                >
                                                    <Chakra.Text>{
                                                        error.message
                                                    }</Chakra.Text>
                                                    <Chakra.Box>
                                                        {
                                                            error.stack
                                                        }
                                                    </Chakra.Box>
                                                </Stack>
                                            </Chakra.AlertDescription>
                                        </Chakra.Alert>
                                    )}
                                >
                                    <Group_Page_Suspense>
                                        <Group_Titles id={props.src.get_id()} />
                                    </Group_Page_Suspense>
                                </TryCatch>

                            </Chakra.TabPanel>
                            <Chakra.TabPanel>
                                <Group_Page_Suspense>
                                    <Group_Feeds id={props.src.get_id()} />
                                </Group_Page_Suspense>
                            </Chakra.TabPanel>
                        </Chakra.TabPanels>
                    </Chakra.Tabs>
                </Container>
            </Chakra.Box>
        </Chakra.Box>
    );


}