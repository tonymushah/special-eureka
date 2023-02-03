import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaQuestionCircle } from "react-icons/fa";
import { UseMutationResult } from "react-query";
import { Link } from "react-router-dom";
import Timeago from "react-timeago";
import { getMangaDexPath } from "../../../..";
import TryCatch from "../../../../../commons-res/components/TryCatch";
import { Chapter } from "../../../../api/structures/Chapter";
import { get_ChapterbyId, get_chapter_groups, get_chapter_user_uploader, get_this_chapter_lang, is_chapter_downloaded, useChapterDownloadMutation } from "../../../hooks/ChapterStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";

const MangaDexPath = getMangaDexPath();

export default function Chapter_Element1(props: {
    chapter: Chapter,
    downloadMutation?: UseMutationResult<string[], Error, void>
}) {
    let downloadMutation: UseMutationResult<string[], Error, void> | undefined = props.downloadMutation;
    const { is_downloaded_queryKey, is_downloaded_query } = is_chapter_downloaded({
        chapter : props.chapter
    });
    const { queryKey } = get_ChapterbyId({
        id : props.chapter.get_id()
    });
    if (downloadMutation == undefined) {
        downloadMutation = useChapterDownloadMutation({
            chapID : props.chapter.get_id(),
            toInvalidate : [
                is_downloaded_queryKey,
                queryKey
            ]
        })
    }
    const { user_query } = get_chapter_user_uploader(props);
    const groups_query = get_chapter_groups(props)
    const {
        this_chapter_lang_query
    } = get_this_chapter_lang(props);
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
                                    to={MangaDexPath + "/chapter/" + props.chapter.get_id()}
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
                                is_downloaded_query.isLoading ? (<Chakra.Spinner size={"md"} />) : (
                                    is_downloaded_query.isSuccess ? (
                                        is_downloaded_query.data ? (
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
                                                to={MangaDexPath + "/group/" + value.data.get_id()}
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
