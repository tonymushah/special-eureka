import * as ChakraIcon from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Center, Text } from "@chakra-ui/react";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Collection } from "@mangadex/api/structures/Collection";
import { QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import ErrorEL1 from "../error/ErrorEL1";
import UseCollection from "./UseCollection";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";

export default function CollectionComponnent_WithQuery<T>(props: {
    fn: () => Promise<Collection<T>>,
    children: (value: Collection<T>) => React.ReactNode,
    queryKey: QueryKey,
    query_options?: Omit<UseQueryOptions<Collection<T>, Error>, "queryKey" | "queryFn">,
    onLoading?: React.ReactNode,
    withoutNavigation?: boolean
}) {
    const toast = useChakraToast({
        id: JSON.stringify(props.queryKey)
    });
    const search_query = useQuery<Collection<T>, Error>(props.queryKey, props.fn, props.query_options);
    const queryClient = useQueryClient();

    const previous = useMutation({
        mutationKey: props.queryKey.concat("previous"),
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                toast({
                    status: "loading",
                    "title": "Loading to previous page",
                    isClosable: false,
                    "position": "bottom-right"
                });
                if (search_query.data != undefined) {
                    resolve(search_query.data.previous());
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data) {
            toast({
                status: "success",
                "title": "Previous page Loaded",
                isClosable: true,
                "duration": 9000
            });
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error) {
            toast({
                status: "error",
                "title": "Error on Loading previous page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            });
        },
    });
    const next = useMutation({
        mutationKey: props.queryKey.concat("next"),
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                toast({
                    status: "loading",
                    "title": "Loading to next page",
                    isClosable: false,
                    "position": "bottom-right"
                });
                if (search_query.data != undefined) {
                    resolve(search_query.data.next());
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data) {
            toast({
                status: "success",
                "title": "Next page Loaded",
                isClosable: true,
                "duration": 9000
            });
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error) {
            toast({
                status: "error",
                "title": "Error on Loading next page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            });
        },
    });
    const first_page = useMutation({
        mutationKey: props.queryKey.concat("first_page"),
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                toast({
                    status: "loading",
                    "title": "Loading to first page",
                    isClosable: false,
                    "position": "bottom-right"
                });
                if (search_query.data != undefined) {
                    resolve(search_query.data.get_first_page());
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data) {
            toast({
                status: "success",
                "title": "First page Loaded",
                isClosable: true,
                "duration": 9000
            });
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error) {
            toast({
                status: "error",
                "title": "Error on Loading first page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            });
        },
    });
    const last_page = useMutation({
        mutationKey: props.queryKey.concat("last_page"),
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                toast({
                    status: "loading",
                    "title": "Loading to last page",
                    isClosable: false,
                    "position": "bottom-right"
                });
                if (search_query.data != undefined) {
                    resolve(search_query.data.get_last_page());
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data) {
            toast({
                status: "success",
                "title": "Last page Loaded",
                isClosable: true,
                "duration": 9000
            });
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error) {
            toast({
                status: "error",
                "title": "Error on LastK first page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            });
        },
    });

    if (next.isLoading || previous.isLoading) {
        return (
            <Box>
                <Box>
                    <Center>
                        {
                            next.isLoading ? (
                                <Text>Loading next page ...</Text>
                            ) : (
                                <React.Fragment/>
                            )
                        }
                        {
                            previous.isLoading ? (
                                <Text>Loading previous page...</Text>
                            ) : (
                                <React.Fragment/>
                            )
                        }
                    </Center>
                </Box>
            </Box>
        );
    }
    if (search_query.isLoading || search_query.isRefetching) {
        if (props.onLoading != undefined) {
            return (<React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>);
        } else {
            return (
                <Box>
                    <Center>
                        <MangadexSpinner />
                    </Center>
                </Box>
            );
        }
    }
    if (search_query.isError) {
        return (
            <Box>
                <ErrorEL1 error={search_query.error} />
            </Box>
        );
    }
    return (
        <Box>
            <Box>
                <UseCollection<T> src={search_query.data!}>
                    {
                        props.children
                    }
                </UseCollection>
            </Box>
            {
                props.withoutNavigation == true ? (
                    <React.Fragment/>
                ) : (
                    <Box>
                        <Center>
                            <ButtonGroup>
                                <Button
                                    onClick={() => {
                                        first_page.mutate();
                                    }}
                                >
                                    <ChakraIcon.ArrowLeftIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        previous.mutate();
                                    }}
                                >
                                    <ChakraIcon.ArrowBackIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        next.mutate();
                                    }}
                                >
                                    <ChakraIcon.ArrowForwardIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        last_page.mutate();
                                    }}
                                >
                                    <ChakraIcon.ArrowRightIcon />
                                </Button>
                            </ButtonGroup>
                        </Center>
                    </Box>
                )
            }

        </Box>
    );
}