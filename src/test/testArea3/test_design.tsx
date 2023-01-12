import React from "react";
import ReactDOM from "react-dom/client";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcon from "@chakra-ui/icons";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import { FaUsers } from "react-icons/fa"
import { Col, Container, Row } from "react-bootstrap"
import {

    QueryClient,

    QueryClientProvider,
    useQuery
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group, Group_WithAllRelationShip } from "../../mangadex/api/structures/Group";

import test_group from "./test_groups/ab24085f-b16c-4029-8c05-38fe16592a85_all_includes.json";
import ErrorEL1 from "../../mangadex/resources/componnents/error/ErrorEL1";
import WaveHaikei from "./imgs/wave-haikei-1.svg";
import { Await } from "react-router-dom"
import { ErrorELAsync } from "../../mangadex/resources/componnents/Error_cmp";
import { CollectionComponnent, CollectionComponnent_WithQuery } from "../../mangadex/resources/componnents/Collection/Collection";
import { Collection } from "../../mangadex/api/structures/Collection";
import { Offset_limits } from "../../mangadex/api/internal/Utils";

function GroupFallBackElement() {
    return (
        <Chakra.Box>
            <Chakra.Skeleton
                height={"30px"}
                width={"sm"}
                borderRadius={"10px"}
            />
        </Chakra.Box>
    );
}

function Group_Simple_Element(props: {
    src: Group
}) {
    try {
        const leader_queryKey = "mdx-user:" + props.src.getLeaderID();
        const leader_query = useQuery(leader_queryKey, () => {
            return props.src.getLeader();
        }, {
            staleTime: Infinity
        })
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box width={"sm"} _hover={{
                    bg: "gray.100",
                    borderRadius: "10px"
                }}
                >
                    <Container>
                        <Row>
                            <Col xs={1}>
                                <Chakra.Icon as={FaUsers} />
                            </Col>
                            <Col xs={6}>
                                <Chakra.Box textAlign={"center"}>
                                    <Chakra.Text size={"sm"}>
                                        <Chakra.Link>
                                            {props.src.get_name()}
                                        </Chakra.Link>
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                            <Col xs={5}>
                                <Chakra.Box
                                    bg={"gray.100"}
                                    textAlign={"center"}
                                    borderRadius={"5px"}
                                >
                                    <Chakra.Text>
                                        Leader : &nbsp;
                                        {
                                            leader_query.isLoading ? (
                                                <Chakra.Skeleton height={"10px"} />
                                            ) : (
                                                leader_query.isSuccess ? (
                                                    <Chakra.Link>{
                                                        leader_query.data.get_username()
                                                    }</Chakra.Link>
                                                ) : (
                                                    <></>
                                                )
                                            )
                                        }
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                        </Row>
                    </Container>
                </Chakra.Box>
            </Chakra.Tooltip>
        )
    } catch (e) {
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box width={"sm"} _hover={{
                    bg: "gray.100",
                    borderRadius: "10px"
                }}
                >
                    <Container>
                        <Row>
                            <Col xs={1}>
                                <Chakra.Icon as={FaUsers} />
                            </Col>
                            <Col xs={6}>
                                <Chakra.Box textAlign={"center"}>
                                    <Chakra.Text size={"sm"}>
                                        <Chakra.Link>
                                            {props.src.get_name()}
                                        </Chakra.Link>
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                            <Col xs={5}>
                                <Chakra.Box
                                    bg={"gray.100"}
                                    textAlign={"center"}
                                    borderRadius={"5px"}
                                >
                                    <Chakra.Text>
                                        Leader : &nbsp;
                                        None
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                        </Row>
                    </Container>
                </Chakra.Box>
            </Chakra.Tooltip>
        )
    }

}

function Group_Simple_Element_ByID(props: {
    id: string
}) {
    const query_key = "mdx-groups-" + props.id;
    const query = useQuery<Group, Error>(query_key, () => {
        return Group.get_groupById(props.id);
    });
    if (query.isLoading) {
        return (
            <GroupFallBackElement />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <Group_Simple_Element
            src={query.data!}
        />
    );
}

function Group_Page(props: React.PropsWithChildren<{
    src: Group
}>) {
    const leader_queryKey = "mdx-user:" + props.src.getLeaderID();
    const leader_query = useQuery(leader_queryKey, () => {
        return props.src.getLeader();
    }, {
        staleTime: Infinity
    })
    return (
        <Chakra.Box as={Container}>
            <Chakra.Box
                height={"sm"}
                backgroundImage={WaveHaikei}
                backgroundPosition={"bottom"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                <Chakra.Center height={"full"}>
                    <Chakra.Box textAlign={"center"}>
                        <Chakra.Heading>{props.src.get_name()}</Chakra.Heading>
                        {
                            leader_query.isSuccess ? (
                                <Chakra.Heading fontSize={"lg"}>Leader : <Chakra.Link>{leader_query.data.get_username()}</Chakra.Link></Chakra.Heading>
                            ) : (
                                <></>
                            )
                        }
                    </Chakra.Box>
                </Chakra.Center>
            </Chakra.Box>
            <Chakra.Box
                background={"gray.200"}
            >
                <Chakra.Tabs>
                    <Chakra.TabList>
                        <Chakra.Tab>Group Details</Chakra.Tab>
                        <Chakra.Tab>Titles</Chakra.Tab>
                        <Chakra.Tab>Feed</Chakra.Tab>
                    </Chakra.TabList>
                </Chakra.Tabs>
            </Chakra.Box>
        </Chakra.Box>
    );
}

const queryClient = new QueryClient();
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
//const id_toUse = "4be9338a-3402-4f98-b467-43fb56663927";
//const to_use_group = Group.get_groupById(test_group.data[0].id);

test_area.render(
    <Chakra.ChakraProvider >
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools
                initialIsOpen={false}
            />
            <Chakra.Box
                margin={10}
            >
                <CollectionComponnent_WithQuery<Group>
                    queryKey={"mdx-search_group"}
                    fn={() => {
                        return Group.search({
                            offset_Limits: new Offset_limits()
                        });
                    }}
                    query_options={
                        {
                            "staleTime" : Infinity
                        }
                    }
                >
                    {
                        (value: Collection<Group>) => (
                            <Container>
                                {
                                    value.get_data().map((value2) => (
                                        <Group_Simple_Element src={value2} />
                                    ))
                                }
                            </Container>
                        )
                    }
                </CollectionComponnent_WithQuery>
            </Chakra.Box>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
);
/**/