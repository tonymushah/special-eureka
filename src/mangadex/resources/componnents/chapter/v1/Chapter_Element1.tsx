import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMutation, UseMutationResult, useQueries, useQuery, UseQueryResult, useQueryClient } from "react-query";
import { Await } from "react-router-dom";
import Timeago from "react-timeago";
import { Lang } from "../../../../api/internal/Utils";
import { Chapter } from "../../../../api/structures/Chapter";
import { Group } from "../../../../api/structures/Group";
import { User } from "../../../../api/structures/User";
import ErrorEL1 from "../../error/ErrorEL1";
import { Link } from "react-router-dom"
import { FaQuestionCircle } from "react-icons/fa";
import TryCatch from "../../../../../commons-res/components/TryCatch";

export default function Chapter_Element1(props: {
    chapter: Chapter,
    downloadMutation?: UseMutationResult<string[], Error, void>
}) {
    let downloadMutation: UseMutationResult<string[], Error, void> | undefined = props.downloadMutation;
    const queryClient = useQueryClient()
    const toast = Chakra.useToast();
    const key = "mdx-chapter:" + props.chapter.get_id();
    if (downloadMutation == undefined) {
        downloadMutation = useMutation({
            mutationKey: "mdx-mutation-chapter-download-" + props.chapter.get_id(),
            mutationFn: () => {
                return props.chapter.download_this();
            },
            onError(error: Error) {
                toast({
                    position: "bottom-right",
                    status: "error",
                    isClosable: true,
                    duration: 9000,
                    title: "Error on downloading",
                    description: error.message
                });
            },
            onSuccess(data, variables, context) {
                toast({
                    position: "bottom-right",
                    status: "success",
                    isClosable: true,
                    duration: 9000,
                    title: "Downloaded chapter",
                    description: props.chapter.get_id()
                });
                queryClient.invalidateQueries({
                    queryKey: key
                });
            },
        })
    }
    const user_query_key = "mdx-user-" + props.chapter.get_user_id();
    const user_query = useQuery<User, Error>(user_query_key, () => {
        return props.chapter.get_userUploader()
    }, {
        staleTime: Infinity
    });
    const is_downloaded_queryKey = "mdx-chapter-" + props.chapter.get_id() + "-is_downloaded";
    const download_query = useQuery(is_downloaded_queryKey, () => {
        return Chapter.is_chapter_downloaded(props.chapter.get_id());
    }, {
        cacheTime: 1000 * 60
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
    const this_chapter_lang_querykey = "mdx-chapter-" + props.chapter.get_id() + "-lang";
    const this_chapter_lang_query = useQuery(this_chapter_lang_querykey, () => {
        return props.chapter.get_translated_Lang();
    }, {
        cacheTime: 1000 * 60
    })
    return (
        <Chakra.Box
            width={"full"}
            padding={1}
            _hover={{
                background: "gray.100"
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
                        {
                            this_chapter_lang_query.isSuccess ? (
                                <Chakra.Tooltip
                                    hasArrow
                                    label={this_chapter_lang_query.data.get_name()}
                                >
                                    <Chakra.Box height={"fit-content"} className={"fi fi-" + this_chapter_lang_query.data.get_flag_icon().toLowerCase()} />
                                </Chakra.Tooltip>
                            ) : (
                                this_chapter_lang_query.isError ? (
                                    <Chakra.Tooltip
                                        hasArrow
                                        label={"Language not found"}
                                    >
                                        <Chakra.Icon as={FaQuestionCircle} />
                                    </Chakra.Tooltip>
                                ) : (
                                    <></>
                                )
                            )
                        }
                    </Chakra.Center>
                </Col>
                <Col
                    xs={7}
                    lg={8}
                >
                    <Chakra.Box
                    >

                        <Chakra.Heading noOfLines={1} margin={0} size={"sm"}>
                            <TryCatch
                                catch={() => (
                                    <>Chapter {props.chapter.get_chapter()} {
                                        props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                    }</>
                                )}
                            >
                                <Chakra.Link
                                    as={Link}
                                    to={"/mangadex/chapter/" + props.chapter.get_id()}
                                >
                                    Chapter {props.chapter.get_chapter()} {
                                        props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                    }
                                </Chakra.Link>
                            </TryCatch>
                        </Chakra.Heading>
                    </Chakra.Box>
                </Col>
                <Col
                    xs={4}
                    lg={3}
                >
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
                            downloadMutation?.isLoading ? (<Chakra.Spinner size={"md"} />) : (
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
                                                downloadMutation?.mutate()
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
                                    return (<></>);
                                }
                                if (value.isSuccess) {
                                    return (
                                        <TryCatch
                                            catch={(error) => (
                                                <Chakra.Link>{value.data!.get_name()}</Chakra.Link>
                                            )}
                                        >
                                            <Chakra.Link
                                                as={Link}
                                                to={"/mangadex/group/" + value.data.get_id()}
                                            >
                                                {value.data!.get_name()}
                                            </Chakra.Link>
                                        </TryCatch>
                                    );
                                    return (<></>)
                                }

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
