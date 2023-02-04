import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaDiscord } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group } from "../../../api/structures/Group";

import { writeText } from '@tauri-apps/api/clipboard';
import * as FontAwesome from "react-icons/fa";

const ExtLink = React.lazy(async () => {
    let res = await import("../../../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})
const ReactMarkDown = React.lazy(() => import("react-markdown"));


export default function Group_Details(props: {
    src: Group
}) {
    const toast = Chakra.useToast({
        position: "bottom-right",
        duration: 9000,
        isClosable: true
    });
    return (
        <Chakra.Box>
            <Container>
                <Row>
                    <Col xs={3}>
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
                    </Col>
                    <Col xs={9}>
                        <Chakra.Box>
                            <Chakra.Heading size={"md"}>Where to find</Chakra.Heading>
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
                                                })
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying to clipboard"
                                                })
                                            })
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
                                    props.src.get_twitter() != undefined &&props.src.get_twitter() != null ? (
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
                                                })
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying IrcChannel to clipboard"
                                                })
                                            })
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
                                                })
                                            }).catch(() => {
                                                toast({
                                                    status: "error",
                                                    title: "Error on copying IrcServer to clipboard"
                                                })
                                            })
                                        }}>IrcServer</Chakra.Button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </React.Suspense>
                        </Chakra.Box>
                        <Chakra.Box>
                            {
                                props.src.get_description() == null || props.src.get_description() == undefined ? (
                                    <></>
                                ) : (
                                    <Chakra.Box>
                                        <Chakra.Heading size={"md"}>Group description</Chakra.Heading>
                                        <Chakra.Box>
                                            <React.Suspense
                                                fallback={<Chakra.Box
                                                    width={"full"}
                                                >
                                                    <Chakra.Center>
                                                        <Chakra.Spinner />
                                                    </Chakra.Center>
                                                </Chakra.Box>}
                                            >
                                                <ReactMarkDown
                                                    children={props.src.get_description()}
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
                                                            )
                                                        }
                                                    }}
                                                />
                                            </React.Suspense>
                                        </Chakra.Box>
                                    </Chakra.Box>
                                )
                            }
                        </Chakra.Box>
                    </Col>
                </Row>
            </Container>
        </Chakra.Box>
    )
}
