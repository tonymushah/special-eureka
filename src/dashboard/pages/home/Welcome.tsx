import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { getVersion } from "@tauri-apps/api/app";
import Tauri_Updater from "../../resources/components/Tauri_updater_button";
import { Container } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import { useQuery } from "react-query";
import { ExtLink } from "../../../commons-res/components/ExtLink";

export default function Welcome() {
    const app_version_query = useQuery("special-eureka-version", () => {
        return getVersion();
    }, {
        staleTime: Infinity
    });
    return (
        <Container>
            <Heading size={"2xl"} textAlign={"center"} marginTop={"100px"}>
                Welcome to Special Eureka
            </Heading>
            <Heading textAlign={"center"} blendMode={"darken"}>You&apos;re currently to version {
                app_version_query.isSuccess ? (
                    <>{app_version_query.data}</>
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
                            colorScheme={"blackAlpha"}
                            leftIcon={
                                <FaGithub />
                            }
                            rightIcon={<ExternalLinkIcon />}
                        >Star this project on Github</Button>
                    </ExtLink>
                    <Tauri_Updater />
                </Stack>
            </Center>
        </Container>
    );
}