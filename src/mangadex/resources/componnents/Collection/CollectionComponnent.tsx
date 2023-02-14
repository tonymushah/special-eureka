import * as ChakraIcon from "@chakra-ui/icons";
import { Box, Button, Center, ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import { Attribute } from "../../../api/structures/Attributes";
import { Collection } from "../../../api/structures/Collection";
import UseCollection from "./UseCollection";

export default function CollectionComponnent<T extends Attribute>(props: {
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
