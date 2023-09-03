import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Center, HStack, Heading, Image, Skeleton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { getVersion } from "@tauri-apps/api/app";
import { FaGithub } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ExtLink } from "@commons-res/components/ExtLink";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import React from "react";

export default function Welcome() {
    const app_version_query = useQuery(["special-eureka", "version"], () => {
        return getVersion();
    }, {
        staleTime: Infinity
    });
    const blendMode = useColorModeValue("darken", undefined);
    const buttonColorScheme = useColorModeValue("blackAlpha", "pink");
    return (
        <ChakraContainer>
            <Heading size={"2xl"} textAlign={"center"} marginTop={"100px"}>
                Welcome to Special Eureka
            </Heading>
            <Heading textAlign={"center"} blendMode={blendMode}>You&apos;re currently to version {
                app_version_query.isSuccess ? (
                    <React.Fragment>{app_version_query.data}</React.Fragment>
                ) : (
                    <Skeleton><i>please wait a bit...</i></Skeleton>
                )
            }</Heading>
            <Center>
                <Stack direction={["column", "row"]} spacing={"4px"}>
                    <ExtLink
                        href={"https://github.com/tonymushah/special-eureka"}
                    >
                        <Button
                            colorScheme={buttonColorScheme}
                            leftIcon={
                                <FaGithub />
                            }
                            rightIcon={<ExternalLinkIcon />}
                        >Star this project on Github</Button>
                    </ExtLink>
                    <Button
                        colorScheme={buttonColorScheme}>
                        <Image fallback={
                            <HStack>
                                <FaGithub/>
                                <Text as={"span"}>
                                    Loading github Stars...
                                </Text>
                            </HStack>
                        } src="https://img.shields.io/github/stars/tonymushah/special-eureka?style=social" alt="stars - special-eureka" />
                    </Button>
                </Stack>
            </Center>
        </ChakraContainer>
    );
}