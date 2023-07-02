import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Timeago from "react-timeago";
import { getMangaDexPath } from "@mangadex/index";
import TryCatch from "@commons-res/components/TryCatch";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_chapter_groups, get_chapter_user_uploader, get_this_chapter_lang } from "@mangadex/resources/hooks/ChapterStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import Flag_icons from "../../FlagIcons";
import UserLink from "../../user/UserLink";
const ChapterDownloadButton = React.lazy(() => import("./ChapterDownloadButton"));
const MangaDexPath = getMangaDexPath();

export default function Chapter_Element1(props: {
    chapter: Chapter,
}) {
    const { user_query } = get_chapter_user_uploader(props);
    const groups_query = get_chapter_groups(props);
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
            <Chakra.Grid
                templateColumns={"repeat(12, 1fr)"}
                height={"fit-content"}
            >
                <Chakra.GridItem
                    colSpan={{
                        base: 1,
                        sm: 1,
                        md: 1,
                        lg: 1
                    }}
                >
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
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 7,
                        lg: 8
                    }}
                >
                    <Chakra.Box
                    >

                        <Chakra.Heading noOfLines={1} margin={0} size={"sm"} fontFamily={"inherit"}>
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
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 4,
                        lg: 3
                    }}
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
                </Chakra.GridItem>
            </Chakra.Grid>
            <Chakra.Grid
                templateColumns={"repeat(12, 1fr)"}
            >
                <Chakra.GridItem
                    colSpan={{
                        base: 1,
                        sm: 1,
                        md: 1,
                        lg: 1
                    }}
                >
                    <Chakra.Center>
                        <React.Suspense
                            fallback={
                                <Chakra.Spinner size={"md"} />
                            }
                        >
                            <ChapterDownloadButton chapter={props.chapter} />
                        </React.Suspense>
                    </Chakra.Center>
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 7,
                        lg: 8
                    }}
                >
                    <Chakra.Wrap>
                        {
                            groups_query.length == 0 ? (<React.Fragment/>) : (
                                groups_query.map((value) => {
                                    if (value.isLoading) {
                                        return (
                                            <Chakra.WrapItem key={Math.random() * 100}>
                                                <Chakra.Text as={"i"} >Loading...</Chakra.Text>
                                            </Chakra.WrapItem>
                                        );
                                    }
                                    if (value.isError) {
                                        return (
                                            <Chakra.WrapItem key={Math.random() * 100}>
                                                <Chakra.Text as={"i"} >No Groups</Chakra.Text>
                                            </Chakra.WrapItem>
                                        );
                                    }
                                    if (value.isSuccess) {
                                        return (
                                            <Chakra.WrapItem key={value.data.get_id()}>
                                                <TryCatch
                                                    catch={() => (
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
                                            </Chakra.WrapItem>
                                        );
                                    }
                                    return (<React.Fragment key={Math.random() * 100}/>);
                                })
                            )
                        }
                    </Chakra.Wrap>
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 4,
                        lg: 3
                    }}
                >
                    {
                        user_query.isLoading ? <Chakra.Skeleton height={"20px"} /> : (
                            user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                                user_query.isSuccess ? (<UserLink user={user_query.data}/>) : (<React.Fragment/>)
                            )
                        )
                    }
                </Chakra.GridItem>
            </Chakra.Grid>
        </Chakra.Box>
    );
}
