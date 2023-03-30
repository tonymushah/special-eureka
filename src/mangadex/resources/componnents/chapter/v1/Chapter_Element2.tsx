import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaQuestionCircle, FaUser, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Timeago from "react-timeago";
import { getMangaDexPath } from "@mangadex";
import TryCatch from "@commons-res/components/TryCatch";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_chapter_groups, get_chapter_user_uploader, get_this_chapter_lang } from "@mangadex/resources/hooks/ChapterStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import Flag_icons from "../../FlagIcons";
const ChapterDownloadButton = React.lazy(() => import("./ChapterDownloadButton"));
const MangaDexPath = getMangaDexPath();

export default function Chapter_Element2(props: {
    chapter: Chapter,
}) {
    const { user_query } = get_chapter_user_uploader(props);
    const groups_query = get_chapter_groups(props);
    const {
        this_chapter_lang_query
    } = get_this_chapter_lang(props);
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
                                return (<Chakra.Link key={value.data!.get_id()} as={Link} to={MangaDexPath + `/group/${value.data!.get_id()}`}>{value.data!.get_name()}</Chakra.Link>);
                            })
                        )
                    }
                    </Chakra.Text>
                    <Chakra.Text margin={0} padding={0} noOfLines={0}>
                        <Chakra.Icon as={FaUser} /> {
                            user_query.isLoading ? <Chakra.Skeleton height={"20px"} /> : (
                                user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                                    user_query.isSuccess ? <Chakra.Link key={user_query.data!.get_id()} as={Link} to={MangaDexPath + `/user/${user_query.data!.get_id()}`}>{user_query.data!.get_username()}</Chakra.Link> : null
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
                            {
                                this_chapter_lang_query.isSuccess ? (
                                    <Chakra.Tooltip
                                        hasArrow
                                        label={this_chapter_lang_query.data.get_name()}
                                    >
                                        <Flag_icons locale={this_chapter_lang_query.data.get_flag_icon().toLowerCase()} />
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
                    <Col xs={10}>
                        <Chakra.Heading noOfLines={1} margin={0} size={"sm"} fontFamily={"inherit"}>
                            <TryCatch
                                catch={() => (
                                    <Chakra.LinkOverlay
                                    >
                                        Chapter {props.chapter.get_chapter()} {
                                            props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                        }
                                    </Chakra.LinkOverlay>
                                )}
                            >
                                <Chakra.LinkOverlay
                                    as={Link}
                                    to={MangaDexPath +"/chapter/" + props.chapter.get_id()}
                                    color={"black"}
                                    textDecoration={"none"}
                                    _hover={{
                                        color : "orange",
                                        textDecoration : "none"
                                    }}
                                >
                                    Chapter {props.chapter.get_chapter()} {
                                        props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                                    }
                                </Chakra.LinkOverlay>
                            </TryCatch>

                        </Chakra.Heading>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Chakra.Center>
                            <React.Suspense
                                fallback={
                                    <Chakra.Spinner size={"md"} />
                                }
                            >
                                <ChapterDownloadButton chapter={props.chapter}/>
                            </React.Suspense>
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
    );
}