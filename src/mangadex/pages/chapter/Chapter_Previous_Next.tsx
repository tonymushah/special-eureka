import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Await, Link } from "react-router-dom";
import { getMangaDexPath } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Chapter } from "../../api/structures/Chapter";
import ErrorEL1 from "../../resources/componnents/error/ErrorEL1";
import { get_aggregate_query } from "../../resources/hooks/AgreggateStateHooks";

const MangaDexPath = getMangaDexPath();

export default function Chapter_Previous_Next(props: {
    src: Chapter
}) {
    const client = useHTTPClient();
    const {query} = get_aggregate_query({
        aggregate_options : props.src.getAggregateList_options(client),
        queryOption : {
            staleTime: 1000 * 60 * 30
        }
    });
    const chapter_aggregate_query = query
    return (
        <React.Fragment>
            {
                chapter_aggregate_query.isLoading || chapter_aggregate_query.isIdle ? (
                    <Chakra.ButtonGroup
                        colorScheme={"orange"}
                    >
                        <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                        <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                    </Chakra.ButtonGroup>
                ) : (
                    chapter_aggregate_query.isError ? (
                        <ErrorEL1 error={chapter_aggregate_query.error} />
                    ) : (
                        chapter_aggregate_query.isSuccess ? (
                            <Chakra.ButtonGroup
                                colorScheme={"orange"}
                            >
                                <React.Suspense
                                    fallback={
                                        <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                    }
                                >
                                    <Await
                                        resolve={props.src.get_previous(chapter_aggregate_query.data)}
                                        errorElement={
                                            <Chakra.Tooltip
                                                hasArrow
                                                label="No previous Chapter"
                                                aria-label="chapter-previous-label"
                                            >
                                                <Chakra.IconButton isDisabled aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                            </Chakra.Tooltip>
                                        }
                                    >
                                        {(getted: string) => (
                                            <Chakra.IconButton as={Link} to={MangaDexPath + "/chapter/" + getted} aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                        )}
                                    </Await>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={
                                        <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                    }
                                >
                                    <Await
                                        resolve={props.src.get_next(chapter_aggregate_query.data)}
                                        errorElement={
                                            <Chakra.Tooltip
                                                hasArrow
                                                label="No next Chapter"
                                                aria-label="chapter-next-label"
                                            >
                                                <Chakra.IconButton isDisabled aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                            </Chakra.Tooltip>
                                        }
                                    >
                                        {(getted: string) => (
                                            <Chakra.IconButton as={Link} to={MangaDexPath +  "/chapter/" + getted} aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                        )}
                                    </Await>
                                </React.Suspense>
                            </Chakra.ButtonGroup>
                        ) : (<></>)
                    )
                )
            }
        </React.Fragment>
    )
}