import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import * as FontAwesome from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import { v4 } from "uuid";

export default function Statis(props: {
    src: Statistics_Manga,
    children?: (value: Statistics_Manga) => React.ReactNode
}) {
    const getted: Statistics_Manga = props.src;
    const context = React.createContext(getted);
    return (
        <Chakra.Popover
            isLazy={true}
            closeOnBlur={false}
        >
            <Chakra.PopoverTrigger>
                {
                    props.children !== undefined ? (
                        <Chakra.Box zIndex={"dropdown"}>
                            <context.Consumer>
                                {
                                    props.children
                                }
                            </context.Consumer>
                        </Chakra.Box>
                    ) : (
                        <Chakra.Box display={"flex"} width={"fit-content"} zIndex={"dropdown"}>
                            <Chakra.Text textAlign={"center"}>
                                <ChakraIcons.StarIcon />
                                &nbsp;
                                {getted.get_average()}
                            </Chakra.Text>
                            &nbsp;
                            &nbsp;
                            <Chakra.Text textAlign={"center"}>
                                <Chakra.Icon as={FontAwesome.FaBookmark} />
                                &nbsp;
                                <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                            </Chakra.Text>
                            &nbsp;
                            &nbsp;
                            <Chakra.Text textAlign={"center"}>
                                <ChakraIcons.ChatIcon />
                                &nbsp;
                                {
                                    getted.comments !== undefined && getted.comments !== null ? (
                                        <React.Fragment>{
                                            getted.get_comments()?.repliesCount !== null && getted.get_comments()?.repliesCount !== undefined ? (
                                                <React.Fragment>{getted.get_comments()?.repliesCount}</React.Fragment>
                                            ) : (
                                                <React.Fragment>0</React.Fragment>
                                            )
                                        }</React.Fragment>
                                    ) : (
                                        <React.Fragment>0</React.Fragment>
                                    )
                                }
                            </Chakra.Text>
                        </Chakra.Box>
                    )
                }

            </Chakra.PopoverTrigger>
            <Chakra.Portal>
                <Chakra.PopoverContent>
                    <Chakra.PopoverHeader>
                        <Chakra.Text>
                            <ChakraIcons.StarIcon />
                            &nbsp;
                            {getted.get_average()}
                            {
                                getted.get_baeysian() != undefined ? (<> ~ {getted.get_baeysian()}</>) : (<></>)
                            }
                        </Chakra.Text>
                        <Chakra.Text>
                            <Chakra.Icon as={FontAwesome.FaBookmark} />
                            &nbsp;
                            <NumericFormat displayType={"text"} valueIsNumericString={true} value={getted.get_follows()} />
                        </Chakra.Text>
                        <Chakra.Text>
                            <ChakraIcons.ChatIcon />
                            &nbsp;
                            {
                                getted.comments !== undefined && getted.comments !== null ? (
                                    <React.Fragment>{
                                        getted.get_comments()?.repliesCount !== null || getted.get_comments()?.repliesCount !== undefined ? (
                                            <React.Fragment>{getted.get_comments()?.repliesCount}</React.Fragment>
                                        ) : (
                                            <React.Fragment>0</React.Fragment>
                                        )
                                    }</React.Fragment>
                                ) : (
                                    <React.Fragment>0</React.Fragment>
                                )
                            }
                        </Chakra.Text>
                        <Chakra.PopoverCloseButton />
                    </Chakra.PopoverHeader>
                    <Chakra.PopoverBody height={"xs"} overflowY={"scroll"}>
                        {
                            Array.from({ length: props.src.get_distribution_length() }, (_, i) => i + 1).reverse().map((value, index) => {
                                const purcent = (getted.get_distribution()[value] / getted.get_distribution_sum()) * 100;
                                return (
                                    <Chakra.Tooltip label={purcent + "%"} key={`${v4()}-${index}`}>
                                        <Chakra.HStack>
                                            <Chakra.Text>{value}</Chakra.Text>
                                            <Chakra.Progress minW={"70%"} value={purcent} />
                                            <Chakra.Text>
                                                &#40; {getted.get_distribution()[value]} &#41;
                                            </Chakra.Text>

                                        </Chakra.HStack>
                                    </Chakra.Tooltip>

                                );
                            }
                            )
                        }
                    </Chakra.PopoverBody>
                </Chakra.PopoverContent>
            </Chakra.Portal>
        </Chakra.Popover>
    );
}