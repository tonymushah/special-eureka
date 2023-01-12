import * as ChakraIcon from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Center, Spinner, Text, ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import { QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { Attribute } from "../../../api/structures/Attributes";
import { Collection } from "../../../api/structures/Collection";
import ErrorEL1 from "../error/ErrorEL1";

export function UseCollection<T extends Attribute>(props: {
    src: Collection<T>,
    children: (value: Collection<T>) => React.ReactNode
}) {
    const context = React.createContext<Collection<T>>(props.src);
    return (
        <context.Consumer>
            {
                props.children
            }
        </context.Consumer>
    )
}

export function CollectionComponnent_WithQuery<T extends Attribute>(props: {
    fn: () => Promise<Collection<T>>,
    children: (value: Collection<T>) => React.ReactNode,
    queryKey: QueryKey,
    query_options?: Omit<UseQueryOptions<Collection<T>, Error>, 'queryKey' | 'queryFn'>,
    onLoading? : React.ReactNode
}) {
    const toast = useToast();
    const toastID = React.useRef<ToastId>();
    function addToast(props?: UseToastOptions) {
        toastID.current = toast(props)
    }
    function updateToast(props?: UseToastOptions) {
        if (toastID.current != undefined && props != undefined) {
            toast.update(toastID.current, props);
        }
    }
    const search_query = useQuery<Collection<T>, Error>(props.queryKey, props.fn, props.query_options);
    const queryClient = useQueryClient();

    const previous = useMutation({
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                addToast({
                    status: "loading",
                    "title": "Loading to previous page",
                    isClosable: false,
                    "position": "bottom-right"
                })
                if (search_query.data != undefined) {
                    resolve(search_query.data.previous())
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data, variables, context) {
            updateToast({
                status: "success",
                "title": "Previous page Loaded",
                isClosable: true,
                "duration": 9000
            })
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error, variables, context) {
            updateToast({
                status: "error",
                "title": "Error on Loading previous page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            })
        },
    });
    const next = useMutation({
        mutationFn: () => {
            return new Promise<Collection<T>>((resolve, reject) => {
                addToast({
                    status: "loading",
                    "title": "Loading to next page",
                    isClosable: false,
                    "position": "bottom-right"
                })
                if (search_query.data != undefined) {
                    resolve(search_query.data.next())
                } else {
                    reject(new Error("the search query is'nt finished"));
                }
            });
        },
        onSuccess(data, variables, context) {
            updateToast({
                status: "success",
                "title": "Next page Loaded",
                isClosable: true,
                "duration": 9000
            })
            queryClient.setQueryData(props.queryKey, data, {
            });
        },
        onError(error: Error, variables, context) {
            updateToast({
                status: "error",
                "title": "Error on Loading next page",
                isClosable: true,
                description: error.message,
                "duration": 9000
            })
        },
    });
    if(search_query.isLoading){
        if(props.onLoading != undefined){
            return (<>
                {
                    props.onLoading
                }
            </>)
        }else{
            return (
                <Box>
                    <Center>
                        <Spinner/>
                    </Center>
                </Box>
            );
        }
    }
    if(search_query.isError){
        return (
            <Box>
                <ErrorEL1 error={search_query.error}/>
            </Box>
        )
    }
    return (
        <Box>
            <Box>
                <Center>
                    {
                        next.isLoading? (
                            <Text>Loading next page ...</Text>
                        ) : (
                            <></>
                        )
                    }
                    {
                        previous.isLoading? (
                            <Text>Loading previous page...</Text>
                        ) : (
                            <></>
                        )
                    }
                </Center>
            </Box>
            <Box>
                <UseCollection<T> src={search_query.data!}>
                    {
                        props.children
                    }
                </UseCollection>
            </Box>
            <Box>
                <Center>
                    <ButtonGroup>
                        <Button 
                            onClick={() => {
                                previous.mutate()
                            }}
                        >
                            <ChakraIcon.ArrowBackIcon/>
                        </Button>
                        <Button>
                            <ChakraIcon.ArrowForwardIcon
                                onClick={() => {
                                    next.mutate()
                                }}
                            />
                        </Button>
                    </ButtonGroup>
                </Center>
            </Box>
        </Box>
    )
}

export function CollectionComponnent<T extends Attribute>(props: {
    src: Collection<T>,
    children: (value: Collection<T>) => React.ReactNode
}) {
    const toast = useToast();
    const toastID = React.useRef<ToastId>();
    const [collection, setCollection] = React.useState<Collection<T>>(props.src);
    function addToast(props?: UseToastOptions) {
        toastID.current = toast(props)
    }
    function updateToast(props?: UseToastOptions) {
        if (toastID.current != undefined && props != undefined) {
            toast.update(toastID.current, props);
        }
    }
    return (
        <Box>
            <Box>
                <UseCollection<T> src={collection}>
                    {props.children}
                </UseCollection>
            </Box>
            <Box>
                <Center>
                    <Button
                        onClick={() => {
                            addToast({
                                status: "loading",
                                "title": "Loading to previous page",
                                isClosable: false,
                                "position": "bottom-right"
                            })
                            collection.previous().then((value: Collection<T>) => {
                                updateToast({
                                    status: "success",
                                    "title": "Previous page Loaded",
                                    isClosable: true,
                                    "duration": 9000
                                })
                                setCollection(value);
                            }).catch(reason => {
                                updateToast({
                                    status: "error",
                                    "title": "Error on Loading Previous page",
                                    isClosable: true,
                                    "duration": 9000
                                })
                            })
                        }}
                    >
                        <ChakraIcon.ArrowLeftIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            addToast({
                                status: "loading",
                                "title": "Loading next page",
                                "position": "bottom-right",
                                isClosable: false
                            })
                            collection.next().then((value: Collection<T>) => {
                                updateToast({
                                    status: "success",
                                    "title": "Next page Loaded",
                                    isClosable: true,
                                    "duration": 9000
                                })
                                setCollection(value);
                            }).catch(reason => {
                                updateToast({
                                    status: "error",
                                    "title": "Error on Loading next page",
                                    isClosable: true,
                                    "duration": 9000
                                })
                            })
                        }}
                    >
                        <ChakraIcon.ArrowRightIcon />
                    </Button>
                </Center>
            </Box>
        </Box>
    )
}
