import * as ChakraIcon from "@chakra-ui/icons";
import { Box, Button, Center, ToastId } from "@chakra-ui/react";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Attribute } from "@mangadex/api/structures/Attributes";
import { Collection } from "@mangadex/api/structures/Collection";
import React from "react";
import UseCollection from "./UseCollection";

export default function CollectionComponnent<T extends Attribute>(props: {
    src: Collection<T>,
    children: (value: Collection<T>) => React.ReactNode,
    id?: ToastId
}) {
    const toast = useChakraToast({
        id: props.id
    });
    const [collection, setCollection] = React.useState<Collection<T>>(props.src);
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
                            toast({
                                status: "loading",
                                "title": "Loading to previous page",
                                isClosable: false,
                                "position": "bottom-right"
                            });
                            collection.previous().then((value: Collection<T>) => {
                                toast({
                                    status: "success",
                                    "title": "Previous page Loaded",
                                    isClosable: true,
                                    "duration": 9000
                                });
                                setCollection(value);
                            }).catch((reason) => {
                                if (typeof reason == "string") {
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: reason,
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }else if(typeof reason == "object" && reason instanceof Error) {
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: reason.message,
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }else{
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: JSON.stringify(reason),
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }
                            });
                        }}
                    >
                        <ChakraIcon.ArrowLeftIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            toast({
                                status: "loading",
                                "title": "Loading next page",
                                "position": "bottom-right",
                                isClosable: false
                            });
                            collection.next().then((value: Collection<T>) => {
                                toast({
                                    status: "success",
                                    "title": "Next page Loaded",
                                    isClosable: true,
                                    "duration": 9000
                                });
                                setCollection(value);
                            }).catch((reason) => {
                                if (typeof reason == "string") {
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: reason,
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }else if(typeof reason == "object" && reason instanceof Error) {
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: reason.message,
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }else{
                                    toast({
                                        status: "error",
                                        "title": "Error on Loading Previous page",
                                        description: JSON.stringify(reason),
                                        isClosable: true,
                                        "duration": 9000
                                    });
                                }
                            });
                        }}
                    >
                        <ChakraIcon.ArrowRightIcon />
                    </Button>
                </Center>
            </Box>
        </Box>
    );
}
