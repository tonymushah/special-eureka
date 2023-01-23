import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import {
    useQuery
} from 'react-query';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group } from "../../../api/structures/Group";
import TryCatch from "../../../../commons-res/components/TryCatch";
import { Link } from "react-router-dom";

export default function Group_Simple_Element(props: {
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
                                            <Chakra.Link as={Link} to={"/mangadex/group/" + props.src.get_id()}>
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
        )
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
        )
    }

}
