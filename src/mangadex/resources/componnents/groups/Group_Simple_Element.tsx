import * as Chakra from "@chakra-ui/react";
import { Col, Container, Row } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import {
    useQuery
} from "react-query";
import { Group } from "@mangadex/api/structures/Group";
import TryCatch from "@commons-res/components/TryCatch";
import { Link } from "react-router-dom";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { getMangaDexPath } from "@mangadex";

const MangaDexPath = getMangaDexPath();

export default function Group_Simple_Element(props: {
    src: Group
}) {
    const client = useHTTPClient();
    try {
        const leader_queryKey = "mdx-user:" + props.src.getLeaderID();
        const leader_query = useQuery(leader_queryKey, () => {
            return props.src.getLeader(client);
        }, {
            staleTime: Infinity
        });
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box _hover={{
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
                                        <TryCatch
                                            catch={
                                                (error: Error) => (
                                                    <Chakra.Link>
                                                        {props.src.get_name()}
                                                    </Chakra.Link>
                                                )
                                            }
                                        >
                                            <Chakra.Link as={Link} to={MangaDexPath + "/group/" + props.src.get_id()}>
                                                {props.src.get_name()}
                                            </Chakra.Link>
                                        </TryCatch>

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
        );
    } catch (e) {
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box _hover={{
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
        );
    }

}
