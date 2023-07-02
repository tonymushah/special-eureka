import { Box, Button, Center, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ExtLink } from "@commons-res/components/ExtLink";
import Tauri_Updater from "@dashboard/resources/components/Tauri_updater_button";
import { TauriCheckUpdateQuery, useTauriInstallUpdate } from "@dashboard/resources/hooks/UpdaterQuery";
import { appWindow } from "@tauri-apps/api/window";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

export default function InstallUpdate() {
    const shouldUpdate = TauriCheckUpdateQuery({
        withoutToast: true
    });
    const installUpdate = useTauriInstallUpdate({
        withoutToast: true
    });
    appWindow.setTitle("Checking updates... | Dashboard").then();
    if (shouldUpdate.query.isSuccess) {
        if (shouldUpdate.query.data.shouldUpdate == false) {
            appWindow.setTitle("No update required | Dashboard").then();
            return (
                <Box>
                    <ChakraContainer>
                        <Heading textAlign={"center"}>There is no need to update</Heading>
                        <Text textAlign={"center"}>Your application version is up to date</Text>
                    </ChakraContainer>
                </Box>
            );
        } else {
            appWindow.setTitle(`Special Eureka ${shouldUpdate.query.data.manifest?.version} is available | Dashboard`).then();
            return (
                <Box>
                    <ChakraContainer>
                        <Heading textAlign={"center"}>An update is available</Heading>
                        <Text textAlign={"center"}>Version : {shouldUpdate.query.data.manifest?.version}</Text>
                        <Text textAlign={"center"}>Date : {shouldUpdate.query.data.manifest?.date}</Text>
                        <ReactMarkdown
                            components={{
                                a(node) {
                                    return (
                                        <React.Suspense
                                            fallback={<Skeleton width={"10px"} height={"10px"} />}
                                        >
                                            {
                                                node.href == undefined ? (
                                                    <Link>{node.children}</Link>
                                                ) : (
                                                    <ExtLink href={node.href}>
                                                        <Link>{node.children}</Link>
                                                    </ExtLink>
                                                )
                                            }
                                        </React.Suspense>
                                    );
                                }
                            }}
                        >
                            {shouldUpdate.query.data.manifest ? shouldUpdate.query.data.manifest.body : ""}
                        </ReactMarkdown>
                        <Center>
                            <Center>
                                <Button colorScheme={"red"}
                                    isLoading={installUpdate.query.isLoading || installUpdate.query.isFetching}
                                    isDisabled={installUpdate.query.isError}
                                    onClick={() => {
                                        installUpdate.query.refetch();
                                    }}>Update</Button>
                            </Center>
                        </Center>
                    </ChakraContainer>
                </Box>
            );
        }
    } else {
        return (
            <Box>
                <ChakraContainer>
                    <Heading textAlign={"center"}>Please check if there is some update first</Heading>
                    <Center>
                        <Tauri_Updater />
                    </Center>
                </ChakraContainer>
            </Box>
        );
    }
}