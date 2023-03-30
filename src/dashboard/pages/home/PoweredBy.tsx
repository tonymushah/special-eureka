import { Button, Center, Heading, Image, Tooltip, Wrap, WrapItem } from "@chakra-ui/react";
import vite_logo from "@commons-res/common-icon/favicon.svg";
import chakra_ui_logo from "@commons-res/common-icon/icons8-chakra-ui-480.svg";
import react_logo from "@commons-res/common-icon/React-icon.svg";
import tauri_logo from "@commons-res/common-icon/Square30x30Logo.png";
import { ExtLink } from "@commons-res/components/ExtLink";
import { Container, Row } from "react-bootstrap";

export default function PoweredBy() {
    return (
        <Container>
            <Heading textAlign={"center"} textColor={"white"}>Powered by</Heading>
            <Row>
                <Center>
                    <Wrap>
                        <WrapItem>
                            <ExtLink href="https://tauri.app">
                                <Tooltip label="Providing this desktop application">
                                    <Button
                                        colorScheme={"blackAlpha"}
                                        leftIcon={
                                            <Image
                                                src={tauri_logo}
                                                width={"30px"}
                                            />
                                        }
                                    >
                                        Tauri
                                    </Button>
                                </Tooltip>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink href="https://vitejs.dev">
                                <Tooltip
                                    label="Providing a nice bundle and dev environment"
                                >
                                    <Button
                                        colorScheme={"blackAlpha"}
                                        leftIcon={
                                            <Image
                                                src={vite_logo}
                                                width={"30px"}
                                            />
                                        }
                                    >
                                        Vite
                                    </Button>
                                </Tooltip>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink href="https://reactjs.org">
                                <Tooltip label="The frontend tool">
                                    <Button
                                        colorScheme={"blackAlpha"}
                                        leftIcon={
                                            <Image
                                                src={react_logo}
                                                width={"30px"}
                                            />
                                        }
                                    >
                                        React
                                    </Button>
                                </Tooltip>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink href="https://chakra-ui.com">
                                <Tooltip label={"Providing a nice UI library to work with"}>
                                    <Button
                                        colorScheme={"blackAlpha"}
                                        leftIcon={
                                            <Image
                                                src={chakra_ui_logo}
                                                width={"30px"}
                                            />
                                        }
                                    >
                                        Chakra UI
                                    </Button>
                                </Tooltip>
                            </ExtLink>
                        </WrapItem>
                    </Wrap>
                </Center>
            </Row>
        </Container>
    );
}