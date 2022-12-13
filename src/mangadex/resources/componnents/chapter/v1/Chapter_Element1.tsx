import * as Chakra from "@chakra-ui/react";
import * as ChakraIcon from "@chakra-ui/icons";
import React from "react";
import { Await } from "react-router-dom";
import { Lang } from "../../../../api/internal/Utils";
import { Chapter } from "../../../../api/structures/Chapter";
import { ErrorELAsync1 } from "../../Error_cmp";
import { Group } from "../../../../api/structures/Group";
import Timeago from "react-timeago";
import { User } from "../../../../api/structures/User";

export default function Chapter_Element1(props: {
    chapter: Chapter
}) {
    return (
        <Chakra.Box>
            <Chakra.HStack>
                <Chakra.VStack>
                    <Chakra.Box>
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
                                                <Chakra.Box className={"fi fi-" + to_use_lang.get_flag_icon().toLowerCase()} />
                                            </Chakra.Tooltip>
                                        )
                                    }
                                </Await>
                            </React.Suspense>
                        </Chakra.Center>
                    </Chakra.Box>
                    <Chakra.Box>
                        <Chakra.Center>
                            <React.Suspense
                                fallback={<Chakra.Spinner />}
                            >
                                <Await
                                    resolve={Chapter.getAOfflineChapter(props.chapter.get_id())}
                                    errorElement={<ChakraIcon.DownloadIcon />}
                                >
                                    <Chakra.Tooltip
                                        label="Downloaded Chapter"
                                    >
                                        <ChakraIcon.CheckIcon />
                                    </Chakra.Tooltip>
                                </Await>
                            </React.Suspense>
                        </Chakra.Center>
                    </Chakra.Box>
                </Chakra.VStack>
                <Chakra.VStack>
                    <Chakra.Box>
                        <Chakra.Heading noOfLines={2} size={"sm"}>Chapter {props.chapter.get_chapter()} {
                            props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                        }</Chakra.Heading>
                    </Chakra.Box>
                    <Chakra.Box>
                        <React.Suspense
                            fallback={
                                <Chakra.Skeleton height={"20px"} />
                            }
                        >
                            <Await
                                resolve={props.chapter.get_groupUploaders()}
                                errorElement={<ErrorELAsync1 />}
                            >
                                {(getted_groups: Array<Group>) => {
                                    if (getted_groups.length <= 0) {
                                        return (<></>)
                                    } else if (getted_groups.length == 1) {
                                        return (<Chakra.Link>{getted_groups[0].get_name()}</Chakra.Link>)
                                    } else {
                                        return (
                                            <>{
                                                getted_groups.map((value: Group, index: number) => (
                                                    <>
                                                        <Chakra.Link>{value.get_name()}</Chakra.Link>
                                                        {
                                                            index >= getted_groups.length ? (
                                                                <></>
                                                            ) : (
                                                                <> , </>
                                                            )
                                                        }
                                                    </>
                                                ))
                                            }</>
                                        )
                                    }
                                }}
                            </Await>
                        </React.Suspense>
                    </Chakra.Box>
                </Chakra.VStack>
                <Chakra.VStack>
                    <Chakra.Box>
                        <Timeago date={new Date(props.chapter.get_createdAt())}></Timeago>
                    </Chakra.Box>
                    <Chakra.Box>
                        <React.Suspense
                            fallback={
                                <Chakra.Skeleton height={"20px"} />
                            }
                        >
                            <Await
                                resolve={props.chapter.get_userUploader()}
                                errorElement={<ErrorELAsync1 />}
                            >
                                {(getted_user: User) => (
                                    <Chakra.Link size={"sm"}>{getted_user.get_username()}</Chakra.Link>
                                )}
                            </Await>
                        </React.Suspense>
                    </Chakra.Box>
                </Chakra.VStack>
            </Chakra.HStack>
        </Chakra.Box>
    )
}
