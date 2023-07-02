import { Button, Box, Heading, Text, Wrap, WrapItem, Image, Tooltip } from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { FaDiscord, FaGithub } from "react-icons/fa";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
export default function Contacts(){
    return(
        <ChakraContainer id="tony-mushah-links">
            <Heading size={"xl"} textAlign={"center"} color={"white"}>Contacts</Heading>
            <Box>
                <Box textColor={"white"}>
                    <Text m={0}>If you need some help, advices, or giving feedbacks,</Text>
                    <Text m={0}>contact me via : </Text>
                    <Wrap spacing={"15px"}>
                        <WrapItem>
                            <ExtLink
                                href={"https://github.com/tonymushah/special-eureka/discussions"}
                            >
                                <Button
                                    colorScheme={"whiteAlpha"}
                                    leftIcon={
                                        <FaGithub/>
                                    }
                                >
                                    GitHub Discussion
                                </Button>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink
                                href={"https://forums.mangadex.org/members/tony_mushah.552492/"}
                            >
                                <Button
                                    colorScheme={"orange"}
                                    leftIcon={
                                        <Image
                                            src={mangadex_logo}
                                            width={"20px"}
                                        />
                                    }
                                >
                                    Mangadex Forums
                                </Button>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink
                                href={"https://forums.mangadex.org/threads/a-mangadex-desktop-app-builded-with-tauri-and-react.1123744/"}
                            >
                                <Button
                                    colorScheme={"orange"}
                                    leftIcon={
                                        <Image
                                            src={mangadex_logo}
                                            width={"20px"}
                                        />
                                    }
                                >
                                    Mangadex Forums (Project Post)
                                </Button>
                            </ExtLink>
                        </WrapItem>
                        <WrapItem>
                            <ExtLink
                                href={"https://discordapp.com/users/541995759310995466"}
                            >
                                <Tooltip hasArrow label="Note: I'm not often connected to Discord so it's not recommended to ping me">
                                    <Button
                                        colorScheme={"linkedin"}
                                        leftIcon={
                                            <FaDiscord/>
                                        }
                                    >
                                        Discord
                                    </Button>
                                </Tooltip>
                            </ExtLink>
                        </WrapItem>
                    </Wrap>
                </Box>
            </Box>
        </ChakraContainer>
    );
}