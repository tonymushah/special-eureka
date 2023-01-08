import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { UseMutationResult, useQueries, useQuery, UseQueryResult } from "react-query";
import { Await } from "react-router-dom";
import Timeago from "react-timeago";
import { Lang } from "../../../../api/internal/Utils";
import { Chapter } from "../../../../api/structures/Chapter";
import { Group } from "../../../../api/structures/Group";
import { User } from "../../../../api/structures/User";
import ErrorEL1 from "../../error/ErrorEL1";
import { Link } from "react-router-dom"

export default function Chapter_Element1(props: {
    chapter: Chapter,
    downloadMutation? : UseMutationResult<string[], Error, void>
}) {
    const user_query_key = "mdx-user-" + props.chapter.get_user_id();
    const user_query = useQuery<User>(user_query_key, () => {
        return props.chapter.get_userUploader()
    }, {
        staleTime: Infinity
    });
    const groups_query: Array<UseQueryResult<Group, unknown>> = useQueries(
        props.chapter.get_scanlations_groups_id().map((value: string) => {
            return {
                queryKey: "mdx-groups-" + value,
                queryFn: () => {
                    return props.chapter.get_scanlation_group_byID(value);
                },
                staleTime: Infinity
            }
        })
    )
    return (
        <Chakra.Box
            width={"full"}
            padding={1}
            _hover={{
                background : "gray.100"
            }}
            borderRadius={10}
        >
            <Chakra.Box
                as={Row}
                height={"fit-content"}
            >
                <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                >
                    <Chakra.Center>
                        <React.Suspense>
                            <Await
                                resolve={props.chapter.get_translated_Lang()}
                                errorElement={<></>}
                            >
                                {
                                    (to_use_lang: Lang) => (
                                        <Chakra.Tooltip
                                            hasArrow
                                            label={to_use_lang.get_name()}
                                        >
                                            <Chakra.Box height={"fit-content"} className={"fi fi-" + to_use_lang.get_flag_icon().toLowerCase()} />
                                        </Chakra.Tooltip>
                                    )
                                }
                            </Await>
                        </React.Suspense>
                    </Chakra.Center>
                </Col>
                <Col
                    xs={7}
                    lg={8}
                >
                    <Chakra.Box
                    >
                        <Chakra.Heading noOfLines={1} margin={0} size={"sm"}>
                            <Chakra.Link
                                as={Link}
                                to={"/mangadex/chapter/" + props.chapter.get_id()}
                            >
                                Chapter {props.chapter.get_chapter()} {
                                    props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                }
                            </Chakra.Link>
                        </Chakra.Heading>
                    </Chakra.Box>
                </Col>
                <Col
                    xs={4}
                    lg={3}
                >
                    <Chakra.Text
                        fontSize={{
                            base : 15
                        }}
                        noOfLines={1}
                        margin={0}
                    >
                        <Timeago date={new Date(props.chapter.get_createdAt())}></Timeago>
                    </Chakra.Text>
                </Col>
            </Chakra.Box>
            <Row>
                <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                >
                    <Chakra.Center>
                        {
                            props.downloadMutation?.isLoading? (<Chakra.Spinner size={"md"}/>) : (
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={Chapter.getAOfflineChapter(props.chapter.get_id())}
                                        errorElement={<ChakraIcon.DownloadIcon _hover={{
                                            color : "blue"
                                        }} onClick={() => {
                                            props.downloadMutation?.mutate()
                                        }}/>}
                                    >
                                        <Chakra.Tooltip
                                            label="Downloaded Chapter"
                                        >
                                            <ChakraIcon.CheckIcon 
                                                _hover={{
                                                    color : "orange"
                                                }}
                                                onClick={() => {
                                                    props.downloadMutation?.mutate()
                                                }}
                                            />
                                        </Chakra.Tooltip>
                                    </Await>
                                </React.Suspense>
                            )
                        }
                    </Chakra.Center>
                </Col>
                <Col
                    xs={7}
                    lg={8}
                >
                    {
                        groups_query.length == 0 ? (<></>) : (
                            groups_query.map((value) => {
                                if (value.isLoading) {
                                    return (<></>);
                                }
                                if (value.isError) {
                                    (<></>);
                                }
                                return (<Chakra.Link>{value.data!.get_name()}</Chakra.Link>)
                            })
                        )
                    }
                </Col>
                <Col
                    xs={4}
                    lg={3}
                >
                    {
                        user_query.isLoading ? <Chakra.Skeleton height={"20px"} /> : (
                            user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                                user_query.isSuccess ? <Chakra.Link noOfLines={1} size={"sm"}>{user_query.data!.get_username()}</Chakra.Link> : (<></>)
                            )
                        )
                    }
                </Col>
            </Row>
        </Chakra.Box>
    )
}
