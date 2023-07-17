import React from "react";
import * as Chakra from "@chakra-ui/react";
import {
    useQuery
} from "@tanstack/react-query";
import { Group } from "@mangadex/api/structures/Group";
import WaveHaikei from "./wave-haikei-1.svg";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Client } from "@tauri-apps/api/http";
import TryCatch from "@commons-res/components/TryCatch";
import { appWindow } from "@tauri-apps/api/window";
import { getMangaDexPath, trackEvent, useMangaDexPath } from "@mangadex/index";
import { Link } from "react-router-dom";
import ChakraContainer from "../layout/Container";
import { Link as ReactRouterLink } from "react-router-dom";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";

const IsPingable = React.lazy(() => import("../IsPingable"));

export function Group_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Box>
                    <Chakra.Center>
                        <MangadexSpinner />
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
    const MangaDexPath = useMangaDexPath();
    return (
        <React.Fragment>
            {
                leader_query.isSuccess ? (
                    <Chakra.Heading fontSize={"lg"}>Leader : <Chakra.Link as={ReactRouterLink} to={`${MangaDexPath}/user/${leader_query.data.get_id()}`}>{leader_query.data.get_username()}</Chakra.Link></Chakra.Heading>
                ) : (
                    <React.Fragment />
                )
            }
        </React.Fragment>
    );
}

export default function Group_Page(props: React.PropsWithChildren<{
    src: Group
}>) {
    const MangaDexPath = getMangaDexPath();
    const client = useHTTPClient();
    React.useEffect(() => {
        appWindow.setTitle(`${props.src.get_name()} | Mangadex`).then();
        trackEvent("mangadex-group-page", {
            type: "group",
            id: props.src.get_id()
        });
    }, []);
    return (
        <Chakra.Box minHeight={"100vh"} >
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
                                onSuccess={() => (
                                    <TryCatch
                                        catch={() => (
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
                                            isLoading={query.fetchStatus === "fetching"}
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
                minH={"100%"}
                background={"gray.200"}
            >
                <ChakraContainer
                    paddingLeft={"5px"}
                    paddingRight={"5px"}
                >
                    <Chakra.VStack>
                        <ChakraContainer>
                            <Chakra.Wrap spacing={"5"}>
                                <Chakra.WrapItem>
                                    <Chakra.Link
                                        as={Link}
                                        to={`${MangaDexPath}/group/${props.src.get_id()}/`}
                                    >
                                        Group Details
                                    </Chakra.Link>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <Chakra.Link
                                        as={Link}
                                        to={`${MangaDexPath}/group/${props.src.get_id()}/titles`}
                                    >
                                        Titles
                                    </Chakra.Link>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <Chakra.Link
                                        as={Link}
                                        to={`${MangaDexPath}/group/${props.src.get_id()}/feeds/`}
                                    >
                                        Feed
                                    </Chakra.Link>
                                </Chakra.WrapItem>
                            </Chakra.Wrap>
                        </ChakraContainer>
                        <ChakraContainer>
                            {
                                props.children
                            }
                        </ChakraContainer>
                    </Chakra.VStack>
                </ChakraContainer>
            </Chakra.Box>
        </Chakra.Box>
    );


}

