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
import { useQueries, useQuery, UseQueryResult } from "react-query";
import ErrorEL1 from "../../error/ErrorEL1";

export default function Chapter_Element1(props: {
    chapter: Chapter
}) {
    const user_query_key = "mdx-user-" + props.chapter.get_user_id();
    const user_query = useQuery<User>(user_query_key, () => {
        return props.chapter.get_userUploader()
    }, {
        staleTime : Infinity
    });
    const groups_query: Array<UseQueryResult<Group, unknown>> = useQueries<Array<Group>>(
        props.chapter.get_scanlations_groups_id().map((value : string) => (
            {
                queryKey : "mdx-groups-" + value,
                queryFn : () => {
                    return props.chapter.get_scanlation_group_byID(value);
                },
                staleTime : Infinity
            }
        ))
    )
    return (
        <Chakra.Box>
            <Chakra.HStack>
                <Chakra.VStack
                    justifyContent={"center"}
                >
                    <Chakra.Box
                        height={"max-content"}
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
                                                <Chakra.Box className={"fi fi-" + to_use_lang.get_flag_icon().toLowerCase()} />
                                            </Chakra.Tooltip>
                                        )
                                    }
                                </Await>
                            </React.Suspense>
                        </Chakra.Center>
                    </Chakra.Box>
                    <Chakra.Box
                    >
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
                <Chakra.VStack
                    align={"normal"}
                >
                    <Chakra.Box
                    >
                        <Chakra.Heading noOfLines={2} size={"sm"}>Chapter {props.chapter.get_chapter()} {
                            props.chapter.get_title() == null || props.chapter.get_title() == "" ? (<></>) : (<> - {props.chapter.get_title()}</>)
                        }</Chakra.Heading>
                    </Chakra.Box>
                    <Chakra.Box
                    >
                        {
                            groups_query.length == 0 ? (<></>) : (
                                groups_query.map((value) => {
                                    if(value.isLoading){
                                        return (<></>);
                                    }
                                    if(value.isError){
                                        (<></>);
                                    }
                                    return (<Chakra.Link>{value.data!.get_name()}</Chakra.Link>)
                                })
                            )
                        }
                    </Chakra.Box>
                </Chakra.VStack>
                <Chakra.VStack
                >
                    <Chakra.Box
                    >
                        <Timeago date={new Date(props.chapter.get_createdAt())}></Timeago>
                    </Chakra.Box>
                    <Chakra.Box
                    >
                        {
                            user_query.isLoading? <Chakra.Skeleton height={"20px"} /> : (
                                user_query.isError? <ErrorEL1 error={user_query.error}/> : (
                                    user_query.isSuccess ? <Chakra.Link size={"sm"}>{user_query.data!.get_username()}</Chakra.Link> : (<></>)
                                )
                            )
                        }
                    </Chakra.Box>
                </Chakra.VStack>
            </Chakra.HStack>
        </Chakra.Box>
    )
}
