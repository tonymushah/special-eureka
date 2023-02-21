import { Box, Button, Center, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
import { ExtLink } from "../../../commons-res/components/ExtLink";
import React from "react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { TauriCheckUpdateQuery, useTauriInstallUpdate } from "../../resources/hooks/UpdaterQuery";
import Tauri_Updater from "../../resources/components/Tauri_updater_button";

export default function InstallUpdate() {
    const shouldUpdate = TauriCheckUpdateQuery({
        withoutToast: true
    });
    const installUpdate = useTauriInstallUpdate({
        withoutToast: true
    })
    if (shouldUpdate.query.isSuccess) {
        if (shouldUpdate.query.data.shouldUpdate == false) {
            return (
                <Box>
                    <Container>
                        <Heading textAlign={"center"}>There is no need to update</Heading>
                        <Text textAlign={"center"}>Your application version is up to date</Text>
                    </Container>
                </Box>
            );
        } else {
            return (
                <Box>
                    <Container>
                        <Heading textAlign={"center"}>An update is available</Heading>
                        <Text textAlign={"center"}>Version : {shouldUpdate.query.data.manifest?.version}</Text>
                        <Text textAlign={"center"}>Date : {shouldUpdate.query.data.manifest?.date}</Text>
                        <ReactMarkdown
                            children={shouldUpdate.query.data.manifest ? shouldUpdate.query.data.manifest.body : ""}
                            components={{
                                a(node, href, ...props) {
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
                                    )
                                }
                            }}
                        />
                        <Center>
                            <Center>
                                <Button colorScheme={"red"} onClick={() => {
                                    installUpdate.query.refetch()
                                }}>Update</Button>
                            </Center>
                        </Center>
                    </Container>
                </Box>
            )
        }
    }else{
        return (
            <Box>
                <Container>
                    <Heading textAlign={"center"}>Please if there is some update first</Heading>
                    <Center>
                        <Tauri_Updater/>
                    </Center>
                </Container>
            </Box>
        )
    }
}