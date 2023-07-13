import { HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { FaGithub } from "react-icons/fa";
import Sqwish from "./Sqwish_button";
import { favicon } from "./data";
import ChakraContainer from "../layout/Container";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";

export default function Kuru_Kuru_Credit_Page() {
    const title = useAppWindowTitle();
    React.useEffect(() => {
        title("??? || Mangadex (is it?)");
    },[]);
    return (
        <ChakraContainer p={10}>
            <VStack>
                <HStack>
                    <Heading>
                        Welcome to herta kuru
                    </Heading><Image width={"50px"} src={favicon} />
                </HStack>
                <Text>
                    This easter-egg is for Herta, the <del>annoying</del> cutest genius <ExtLink
                        href="https://hsr.hoyoverse.com/en-us/"
                    >
                        <Text
                            as={"span"}
                            transition={"color 0.2s"}
                            _hover={{
                                color: "purple"
                            }}
                        >
                            Honkai: Star Rail
                        </Text>
                    </ExtLink> character out there.
                </Text>
                <HStack>
                    <Text>
                        Herta has been kuru~ed for
                    </Text>
                    <Sqwish />
                </HStack>
                <HStack>
                    <Text>
                        Credits :
                    </Text>
                    <ExtLink href="https://github.com/duiqt/herta_kuru">
                        <HStack
                            transition={"color 0.2s"}
                            _hover={{
                                color: "purple"
                            }}
                        >
                            <FaGithub />
                            <Text>
                                duiqt/herta_kuru
                            </Text>
                        </HStack>
                    </ExtLink>
                </HStack>
            </VStack>
        </ChakraContainer>
    );
}