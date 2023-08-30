import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Group } from "@mangadex/api/structures/Group";
import { getMangaDexPath } from "@mangadex/index";
import { Link } from "react-router-dom";
import ChakraContainer from "../../layout/Container";

export function BottomContent(props: React.PropsWithChildren<{ src: Group; }>) {
    const MangaDexPath = React.useMemo(getMangaDexPath, []);
    return (
        <Chakra.Box
            minH={"100%"}
            background={"gray.200"}
        >
            <ChakraContainer
                paddingLeft={"5px"}
                paddingRight={"5px"}
            >
                <Chakra.VStack>
                    <ChakraContainer>
                        <Chakra.Wrap spacing={"5"}>
                            <Chakra.WrapItem>
                                <Chakra.Link
                                    as={Link}
                                    to={`${MangaDexPath}/group/${props.src.get_id()}/`}
                                >
                                    Group Details
                                </Chakra.Link>
                            </Chakra.WrapItem>
                            <Chakra.WrapItem>
                                <Chakra.Link
                                    as={Link}
                                    to={`${MangaDexPath}/group/${props.src.get_id()}/titles`}
                                >
                                    Titles
                                </Chakra.Link>
                            </Chakra.WrapItem>
                            <Chakra.WrapItem>
                                <Chakra.Link
                                    as={Link}
                                    to={`${MangaDexPath}/group/${props.src.get_id()}/feeds/`}
                                >
                                    Feed
                                </Chakra.Link>
                            </Chakra.WrapItem>
                        </Chakra.Wrap>
                    </ChakraContainer>
                    <ChakraContainer>
                        {props.children}
                    </ChakraContainer>
                </Chakra.VStack>
            </ChakraContainer>
        </Chakra.Box>
    );
}
