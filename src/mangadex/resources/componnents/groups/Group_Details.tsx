import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { Group } from "@mangadex/api/structures/Group";

import { writeText } from "@tauri-apps/api/clipboard";
import * as FontAwesome from "react-icons/fa";
import ChakraContainer from "../layout/Container";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});
const ReactMarkDown = React.lazy(() => import("react-markdown"));


export default function Group_Details(props: {
    src: Group
}) {
    const toast = useChakraToast({
        position: "bottom-right",
        duration: 9000,
        isClosable: true
    });
    return (
        <Chakra.Box>
            <ChakraContainer>
                <Chakra.Grid templateColumns={"repeat(12, 1fr)"}>
                    <Chakra.GridItem colSpan={3}>
                        <Chakra.Box>
                            <Chakra.Text>
                                {
                                    props.src.get_official() ? (
                                        <Chakra.Button>
                                            <ChakraIcon.CheckIcon boxSize={"1em"} color={"green"} />
                                        </Chakra.Button>
                                    ) : (
                                        <Chakra.Button>
                                            <ChakraIcon.SmallCloseIcon boxSize={"1em"} color={"red"} />
                                        </Chakra.Button>
                                    )
                                }
                                &nbsp;
                                Official
                            </Chakra.Text>
                            <Chakra.Text>
                                {
                                    props.src.get_verified() ? (
                                        <Chakra.Button>
                                            <ChakraIcon.CheckIcon boxSize={"1em"} color={"green"} />
                                        </Chakra.Button>
                                    ) : (
                                        <Chakra.Button>
                                            <ChakraIcon.SmallCloseIcon boxSize={"1em"} color={"red"} />
                                        </Chakra.Button>
                                    )
                                }
                                &nbsp;
                                Verified
                            </Chakra.Text>
                            <Chakra.Text>
                                {
                                    props.src.get_inactive() ? (
                                        <Chakra.Button>
                                            <ChakraIcon.CheckIcon boxSize={"1em"} color={"green"} />
                                        </Chakra.Button>
                                    ) : (
                                        <Chakra.Button>
                                            <ChakraIcon.SmallCloseIcon boxSize={"1em"} color={"red"} />
                                        </Chakra.Button>
                                    )
                                }
                                &nbsp;
                                Inactive
                            </Chakra.Text>
                        </Chakra.Box>
                    </Chakra.GridItem>
                    <Chakra.GridItem colSpan={9}>
                        <Chakra.Box>
                            <Chakra.Heading fontFamily={"inherit"} size={"md"}>Where to find</Chakra.Heading>
                            <React.Suspense>
                                {
                                    props.src.get_website() !== undefined && props.src.get_website() !== null ? (
                                        <ExtLink href={props.src.get_website()}>
                                            <Chakra.Button leftIcon={<ChakraIcon.ExternalLinkIcon />} colorScheme={"gray"} >Website</Chakra.Button>
                                        </ExtLink>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_discord() != undefined && props.src.get_discord() != null ? (
                                        <ExtLink href={"https://discord.gg/" + props.src.get_discord()}>
                                            <Chakra.Button leftIcon={<Chakra.Icon as={FaDiscord} />} colorScheme={"facebook"} >Discord</Chakra.Button>
                                        </ExtLink>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_contactEmail() != undefined && props.src.get_contactEmail() != null ? (
                                        <Chakra.Button onClick={() => {
                                            writeText(props.src.get_contactEmail()).then(() => {
                                                toast({
                                                    status: "success",
                                                    title: "Email copied to clipboard"
                                                });
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying to clipboard"
                                                });
                                            });
                                        }} leftIcon={<ChakraIcon.EmailIcon />}>Email</Chakra.Button>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_mangaUpdates() != undefined && props.src.get_mangaUpdates() != null ? (
                                        <ExtLink href={props.src.get_mangaUpdates()}>
                                            <Chakra.Button leftIcon={<ChakraIcon.ExternalLinkIcon />} colorScheme={"orange"} >MangaUpdates</Chakra.Button>
                                        </ExtLink>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_twitter() != undefined && props.src.get_twitter() != null ? (
                                        <ExtLink href={props.src.get_twitter()}>
                                            <Chakra.Button leftIcon={<FontAwesome.FaTwitter />} colorScheme={"twitter"} >Twitter</Chakra.Button>
                                        </ExtLink>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_ircChannel() != undefined && props.src.get_ircChannel() != null ? (
                                        <Chakra.Button onClick={() => {
                                            writeText(props.src.get_ircChannel()).then(() => {
                                                toast({
                                                    status: "success",
                                                    title: "IrcChannel copied to clipboard"
                                                });
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying IrcChannel to clipboard"
                                                });
                                            });
                                        }}>IrcChannel</Chakra.Button>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    props.src.get_ircServer() != undefined && props.src.get_ircServer() != null ? (
                                        <Chakra.Button onClick={() => {
                                            writeText(props.src.get_ircServer()).then(() => {
                                                toast({
                                                    status: "success",
                                                    title: "IrcServer copied to clipboard"
                                                });
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying IrcServer to clipboard"
                                                });
                                            });
                                        }}>IrcServer</Chakra.Button>
                                    ) : (
                                        <React.Fragment />
                                    )
                                }
                            </React.Suspense>
                        </Chakra.Box>
                        <Chakra.Box>
                            {
                                props.src.get_description() == null || props.src.get_description() == undefined ? (
                                    <React.Fragment />
                                ) : (
                                    <Chakra.Box>
                                        <Chakra.Heading fontFamily={"inherit"} size={"md"}>Group description</Chakra.Heading>
                                        <Chakra.Box>
                                            <React.Suspense
                                                fallback={<Chakra.Box
                                                    width={"full"}
                                                >
                                                    <Chakra.Center>
                                                        <MangadexSpinner />
                                                    </Chakra.Center>
                                                </Chakra.Box>}
                                            >
                                                <ReactMarkDown
                                                    components={{
                                                        a(node, href, ...props) {
                                                            return (
                                                                <React.Suspense
                                                                    fallback={<Chakra.Skeleton width={"10px"} height={"10px"} />}
                                                                >
                                                                    {
                                                                        node.href == undefined ? (
                                                                            <Chakra.Link>{node.children}</Chakra.Link>
                                                                        ) : (
                                                                            <ExtLink href={node.href}>
                                                                                <Chakra.Link>{node.children}</Chakra.Link>
                                                                            </ExtLink>
                                                                        )
                                                                    }
                                                                </React.Suspense>
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {props.src.get_description()}
                                                </ReactMarkDown>
                                            </React.Suspense>
                                        </Chakra.Box>
                                    </Chakra.Box>
                                )
                            }
                        </Chakra.Box>
                    </Chakra.GridItem>
                </Chakra.Grid>
            </ChakraContainer>
        </Chakra.Box>
    );
}
