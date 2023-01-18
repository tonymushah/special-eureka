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
import { FaUser, FaUsers } from "react-icons/fa"

export default function Chapter_Element2(props: {
    chapter: Chapter,
    downloadMutation?: UseMutationResult<string[], Error, void>
}) {
    const user_query_key = "mdx-user-" + props.chapter.get_user_id();
    const user_query = useQuery<User, Error>(user_query_key, () => {
        return props.chapter.get_userUploader()
    }, {
        staleTime: Infinity
    });
    const groups_query: Array<UseQueryResult<Group, unknown>> = useQueries(
        props.chapter.get_scanlations_groups_id().map((value: string) => (
            {
                queryKey: "mdx-groups-" + value,
                queryFn: () => {
                    return props.chapter.get_scanlation_group_byID(value);
                },
                staleTime: Infinity
            }
        ))
    )
    const is_downloaded_queryKey = "mdx-chapter-" + props.chapter.get_id() + "-is_downloaded";
    const download_query = useQuery(is_downloaded_queryKey, () => {
        return Chapter.is_chapter_downloaded(props.chapter.get_id());
    }, {
        cacheTime : 1000 * 60
    });
    return (
        <Chakra.Tooltip
            label={
                <Chakra.Box>
                    <Chakra.Text margin={0} padding={0}>
                        Uploaded by :
                    </Chakra.Text>
                    <Chakra.Text margin={0} padding={0}> <Chakra.Icon as={FaUsers} /> {
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
                    </Chakra.Text>
                    <Chakra.Text margin={0} padding={0} noOfLines={0}>
                        <Chakra.Icon as={FaUser} /> {
                            user_query.isLoading ? <Chakra.Skeleton height={"20px"} /> : (
                                user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                                    user_query.isSuccess ? <Chakra.Link>{user_query.data!.get_username()}</Chakra.Link> : null
                                )
                            )
                        }
                    </Chakra.Text>
                </Chakra.Box>
            }
        >
            <Chakra.LinkBox>
                <Row>
                    <Col xs={2}>
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
                    <Col xs={10}>
                        <Chakra.Heading noOfLines={1} margin={0} size={"sm"}>
                            <Chakra.LinkOverlay
                                as={Link}
                                to={"/mangadex/chapter/" + props.chapter.get_id()}
                            >
                                Chapter {props.chapter.get_chapter()} {
                                    props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                }
                            </Chakra.LinkOverlay>
                        </Chakra.Heading>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Chakra.Center>
                            {
                                props.downloadMutation?.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                                    download_query.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                                        download_query.isSuccess ? (
                                            download_query.data ? (
                                                <Chakra.Tooltip
                                                    label="Downloaded Chapter"
                                                >
                                                    <ChakraIcon.CheckIcon
                                                        _hover={{
                                                            color: "orange"
                                                        }}
                                                        onClick={() => {
                                                            props.downloadMutation?.mutate()
                                                        }}
                                                    />
                                                </Chakra.Tooltip>
                                            ) : (
                                                <ChakraIcon.DownloadIcon _hover={{
                                                    color: "blue"
                                                }} onClick={() => {
                                                    props.downloadMutation?.mutate()
                                                }} />
                                            )
                                        ) : (
                                            <ChakraIcon.WarningIcon />
                                        )
                                    )
                                )
                            }
                        </Chakra.Center>
                    </Col>
                    <Col xs={10}>
                        <Chakra.Text
                            fontSize={{
                                base: 15
                            }}
                            noOfLines={1}
                            margin={0}
                        >
                            <Timeago date={new Date(props.chapter.get_createdAt())}></Timeago>
                        </Chakra.Text>
                    </Col>
                </Row>
            </Chakra.LinkBox>
        </Chakra.Tooltip>
    )
}