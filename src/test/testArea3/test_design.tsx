import React from "react";
import ReactDOM from "react-dom/client";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaDiscord, FaUsers } from "react-icons/fa";
import {

    QueryClient,

    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group, Group_WithAllRelationShip } from "../../mangadex/api/structures/Group";

import { writeText } from '@tauri-apps/api/clipboard';
import { ContentRating, Lang_and_Data, make_first_UpperCare, Offset_limits } from "../../mangadex/api/internal/Utils";
import { Collection } from "../../mangadex/api/structures/Collection";
import { Manga } from "../../mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../../mangadex/resources/componnents/Collection/Collection";
import ErrorEL1 from "../../mangadex/resources/componnents/error/ErrorEL1";
import MangaElementDef from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef";
import WaveHaikei from "./imgs/wave-haikei-1.svg";
import test_group from "./test_groups/ab24085f-b16c-4029-8c05-38fe16592a85_all_includes.json";
import CoverImageByCoverID from "../../mangadex/resources/componnents/covers/v1/CoverImageByCoverID";
import MangaTitle from "../../mangadex/resources/componnents/mangas/v1/MangaTitle";
import { Statistics_Manga } from "../../mangadex/api/structures/Statistics";
import { Statis } from "../../mangadex/resources/componnents/mangas/Manga_Page";
import TryCatch from "../../commons-res/components/TryCatch";
import * as ChakraIcons from "@chakra-ui/icons";
import { NumericFormat } from "react-number-format";
import * as FontAwesome from "react-icons/fa";
import ReactContextMenu from "react-jsx-context-menu"
import { Link } from "react-router-dom";

const ExtLink = React.lazy(async () => {
    let res = await import("../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})
const ReactMarkDown = React.lazy(() => import("react-markdown"));

function GroupFallBackElement() {
    return (
        <Chakra.Box>
            <Chakra.Skeleton
                height={"30px"}
                width={"sm"}
                borderRadius={"10px"}
            />
        </Chakra.Box>
    );
}

function Group_Simple_Element(props: {
    src: Group
}) {
    try {
        const leader_queryKey = "mdx-user:" + props.src.getLeaderID();
        const leader_query = useQuery(leader_queryKey, () => {
            return props.src.getLeader();
        }, {
            staleTime: Infinity
        })
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box _hover={{
                    bg: "gray.100",
                    borderRadius: "10px"
                }}
                >
                    <Container>
                        <Row>
                            <Col xs={1}>
                                <Chakra.Icon as={FaUsers} />
                            </Col>
                            <Col xs={6}>
                                <Chakra.Box textAlign={"center"}>
                                    <Chakra.Text size={"sm"}>
                                        <Chakra.Link>
                                            {props.src.get_name()}
                                        </Chakra.Link>
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                            <Col xs={5}>
                                <Chakra.Box
                                    bg={"gray.100"}
                                    textAlign={"center"}
                                    borderRadius={"5px"}
                                >
                                    <Chakra.Text>
                                        Leader : &nbsp;
                                        {
                                            leader_query.isLoading ? (
                                                <Chakra.Skeleton height={"10px"} />
                                            ) : (
                                                leader_query.isSuccess ? (
                                                    <Chakra.Link>{
                                                        leader_query.data.get_username()
                                                    }</Chakra.Link>
                                                ) : (
                                                    <></>
                                                )
                                            )
                                        }
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                        </Row>
                    </Container>
                </Chakra.Box>
            </Chakra.Tooltip>
        )
    } catch (e) {
        return (
            <Chakra.Tooltip
                label={`This group has ${props.src.getMembersID().length} members`}
            >
                <Chakra.Box _hover={{
                    bg: "gray.100",
                    borderRadius: "10px"
                }}
                >
                    <Container>
                        <Row>
                            <Col xs={1}>
                                <Chakra.Icon as={FaUsers} />
                            </Col>
                            <Col xs={6}>
                                <Chakra.Box textAlign={"center"}>
                                    <Chakra.Text size={"sm"}>
                                        <Chakra.Link>
                                            {props.src.get_name()}
                                        </Chakra.Link>
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                            <Col xs={5}>
                                <Chakra.Box
                                    bg={"gray.100"}
                                    textAlign={"center"}
                                    borderRadius={"5px"}
                                >
                                    <Chakra.Text>
                                        Leader : &nbsp;
                                        None
                                    </Chakra.Text>
                                </Chakra.Box>
                            </Col>
                        </Row>
                    </Container>
                </Chakra.Box>
            </Chakra.Tooltip>
        )
    }

}

function Group_Simple_Element_ByID(props: {
    id: string
}) {
    const query_key = "mdx-groups-" + props.id;
    const query = useQuery<Group, Error>(query_key, () => {
        return Group.get_groupById(props.id);
    });
    if (query.isLoading) {
        return (
            <GroupFallBackElement />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <Group_Simple_Element
            src={query.data!}
        />
    );
}

function Group_Details(props: {
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
                                                                    <Chakra.Link as={ExtLink} href={href} children={node.children} />
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

function Group_Titles(props: {
    id: string
}) {
    return (
        <CollectionComponnent_WithQuery<Manga>
            queryKey={"mdx-group_titles-" + props.id}
            fn={() => {
                return Manga.search({
                    offset_Limits: new Offset_limits(),
                    group: props.id
                })
            }}
            query_options={
                {
                    "staleTime": Infinity
                }
            }
        >
            {
                (value: Collection<Manga>) => (
                    <Chakra.Wrap>
                        {
                            value.get_data().map((value2) => (
                                <Chakra.WrapItem>
                                    <MangaElementDef src={value2} />
                                </Chakra.WrapItem>
                            ))
                        }
                    </Chakra.Wrap>
                )
            }
        </CollectionComponnent_WithQuery>
    )
}

function Group_Page(props: React.PropsWithChildren<{
    src: Group
}>) {
    const leader_queryKey = "mdx-user:" + props.src.getLeaderID();
    const leader_query = useQuery(leader_queryKey, () => {
        return props.src.getLeader();
    }, {
        staleTime: Infinity
    })
    return (
        <Chakra.Box as={Container}>
            <Chakra.Box
                height={"sm"}
                backgroundImage={WaveHaikei}
                backgroundPosition={"bottom"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                <Chakra.Center height={"full"}>
                    <Chakra.Box textAlign={"center"}>
                        <Chakra.Heading>{props.src.get_name()}</Chakra.Heading>
                        {
                            leader_query.isSuccess ? (
                                <Chakra.Heading fontSize={"lg"}>Leader : <Chakra.Link>{leader_query.data.get_username()}</Chakra.Link></Chakra.Heading>
                            ) : (
                                <></>
                            )
                        }
                    </Chakra.Box>
                </Chakra.Center>
            </Chakra.Box>
            <Chakra.Box
                background={"gray.200"}
            >
                <Chakra.Tabs isLazy>
                    <Chakra.TabList>
                        <Chakra.Tab>Group Details</Chakra.Tab>
                        <Chakra.Tab>Titles</Chakra.Tab>
                        <Chakra.Tab>Feed</Chakra.Tab>
                    </Chakra.TabList>
                    <Chakra.TabPanels>
                        <Chakra.TabPanel>
                            <Group_Details src={props.src} />
                        </Chakra.TabPanel>
                        <Chakra.TabPanel>
                            <Group_Titles id={props.src.get_id()} />
                        </Chakra.TabPanel>
                    </Chakra.TabPanels>
                </Chakra.Tabs>
            </Chakra.Box>
        </Chakra.Box>
    );
}


function GroupSearch_Test1() {
    return (
        <CollectionComponnent_WithQuery<Group>
            queryKey={"mdx-search_group"}
            fn={() => {
                return Group.search({
                    offset_Limits: new Offset_limits()
                });
            }}
            query_options={
                {
                    "staleTime": Infinity
                }
            }
        >
            {
                (value: Collection<Group>) => (
                    <Container>
                        {
                            value.get_data().map((value2) => (
                                <Group_Simple_Element src={value2} />
                            ))
                        }
                    </Container>
                )
            }
        </CollectionComponnent_WithQuery>
    );
}

function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: Function,
    download?: Function,
    delete?: Function,
    update?: Function
}) {
    const manga_description_querykey = "mdx-manga-" + props.src.get_id() + "-description";
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    })
    const manga_statistic_queryKey = "mdx-manga-" + props.src.get_id() + "-statistics";
    const manga_statistic_query = useQuery<Statistics_Manga, Error>(manga_statistic_queryKey, () => {
        return Statistics_Manga.get_statsBy_MangaID(props.src.get_id());
    }, {
        staleTime: Infinity
    });
    const card_maxHeight: Chakra.ResponsiveValue<any> = {
        base: "10em"
    }
    const card_minHeight: Chakra.ResponsiveValue<any> = {
        base: ""
    }
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        let returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Chakra.Tag colorScheme={"green"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            } else {
                returns[index] = (<Chakra.Tag colorScheme={"red"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Chakra.Tag colorScheme={"gray"}>{element.get_name().en}</Chakra.Tag>)
        }
        return returns;
    }
    return (
        <ReactContextMenu
            menu={
                <Chakra.Menu
                    isOpen
                >
                    <Chakra.MenuList>
                        <Chakra.MenuItem
                            onClick={() => props.refetch!()}
                        >Refresh</Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.download!()}
                            textColor={"green"}
                            icon={<ChakraIcons.DownloadIcon />}
                        >
                            Download
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.update!()}
                            textColor={"blue"}
                            icon={<ChakraIcons.RepeatIcon />}
                        >
                            Update
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.delete!()}
                            textColor={"red"}
                            icon={<ChakraIcons.DeleteIcon />}
                        >
                            Delete
                        </Chakra.MenuItem>
                    </Chakra.MenuList>
                </Chakra.Menu>
            }
        >
            <Chakra.Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"}>
                <CoverImageByCoverID coverID={props.src.get_cover_art_id()} isThumbail size={512} image_props={{
                    maxHeight: card_maxHeight,
                    "objectFit": "contain"
                }} />
                <Chakra.Stack spacing={"0px"}>
                    <Chakra.CardBody marginTop={"0px"}>
                        <Chakra.HStack spacing={"5px"}>
                            <TryCatch
                                catch={() => (
                                    <Chakra.Heading marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                )}
                            >
                                <Link to={"/mangadex/manga/" + props.src.get_id()}>
                                    <Chakra.Heading marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                </Link>
                            </TryCatch>
                            {
                                manga_statistic_query.isSuccess ? (
                                    <TryCatch
                                        catch={(error: Error) => (
                                            <Chakra.Tag>{error.message}</Chakra.Tag>
                                        )}
                                    >
                                        <Statis src={manga_statistic_query.data}>
                                            {
                                                (getted: Statistics_Manga) => (
                                                    <Chakra.Box>
                                                        <Chakra.Box display={{
                                                            base: "none",
                                                            xl: "inherit"
                                                        }}>
                                                            <Chakra.Box display={"flex"} width={"fit-content"}>
                                                                <Chakra.Text textAlign={"center"}>
                                                                    <ChakraIcons.StarIcon />
                                                                    &nbsp;
                                                                    {getted.get_average()}
                                                                </Chakra.Text>
                                                                &nbsp;
                                                                &nbsp;
                                                                <Chakra.Text textAlign={"center"}>
                                                                    <Chakra.Icon as={FontAwesome.FaBookmark} />
                                                                    &nbsp;
                                                                    <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                                                                </Chakra.Text>
                                                                &nbsp;
                                                                &nbsp;
                                                                <Chakra.Text textAlign={"center"}>
                                                                    <ChakraIcons.ChatIcon />
                                                                    &nbsp;
                                                                    {
                                                                        getted.get_comments() !== undefined ? (
                                                                            <>{getted.get_comments()!.repliesCount}</>
                                                                        ) : (
                                                                            <>0</>
                                                                        )
                                                                    }
                                                                </Chakra.Text>
                                                            </Chakra.Box>
                                                        </Chakra.Box>
                                                        <Chakra.Box display={{
                                                            base: "inherit",
                                                            xl: "none"
                                                        }}>
                                                            <Chakra.Tag>Stats</Chakra.Tag>
                                                        </Chakra.Box>
                                                    </Chakra.Box>
                                                )
                                            }
                                        </Statis>
                                    </TryCatch>

                                ) : (
                                    <Chakra.Skeleton height={"10px"} width={"20px"} />
                                )
                            }
                            <Chakra.Text
                                padding={0}
                                margin={0}
                                fontSize={"xs"}
                            >
                                <Chakra.Center
                                    display={{
                                        base: "none",
                                        xl: "inline"
                                    }}
                                >
                                    Publication :
                                    &nbsp;
                                </Chakra.Center>
                                <Chakra.Tag
                                    fontSize={"xs"}
                                    colorScheme={
                                        props.src.get_status() == "ongoing" ? "green" : (
                                            props.src.get_status() == "completed" ? "blue" : (
                                                props.src.get_status() == "hiatus" ? "orange" : (
                                                    props.src.get_status() == "cancelled" ? "red" : "teal"
                                                )
                                            )
                                        )
                                    }
                                    variant={"solid"}
                                >
                                    <Chakra.TagLabel>{make_first_UpperCare(props.src.get_status())}</Chakra.TagLabel>
                                </Chakra.Tag>
                            </Chakra.Text>
                        </Chakra.HStack>

                        <Chakra.Box noOfLines={1}>
                            {
                                build_themes_manga()
                            }
                        </Chakra.Box>

                        {
                            manga_description_query.isLoading || manga_description_query.isIdle ? (
                                <Chakra.Skeleton
                                    height={"full"}
                                    width={"full"}
                                />
                            ) : (
                                manga_description_query.isSuccess ? (
                                    manga_description_query.data.length == 0 ? (
                                        <></>
                                    ) : (
                                        <Chakra.Text
                                            noOfLines={3}
                                            marginBottom={"1px"}
                                            fontSize={"md"}
                                        >
                                            {manga_description_query.data[0].get_data()}
                                        </Chakra.Text>
                                    )
                                ) : (
                                    manga_description_query.isError ? (
                                        <ErrorEL1 error={manga_description_query.error} />
                                    ) : (
                                        <></>
                                    )
                                )
                            )
                        }
                    </Chakra.CardBody>
                </Chakra.Stack>
            </Chakra.Card>
        </ReactContextMenu>
    )
}

function MangaElementDef2_withID(props: {
    mangaID: string
}) {
    const toast = Chakra.useToast({
        position : "bottom-right"
    });
    const queryClient = useQueryClient();
    const key = "mdx-manga:" + props.mangaID;
    const query = useQuery<Manga>(key, () => {
        return Manga.getMangaByID(props.mangaID);
    }, {
        "staleTime": Infinity
    });
    const delete_ = useMutation({
        mutationFn: () => {
            toast({
                position: "bottom-right",
                title: "Deleting manga...",
                status: "loading",
                duration: 9000,
                isClosable: true
            });
            return query.data!.delete_this()
        },
        onSuccess: () => {
            toast({
                position: "bottom-right",
                title: "Deleted manga",
                status: "success",
                duration: 9000,
                isClosable: true
            })
            queryClient.removeQueries({
                queryKey: key
            })
        },
        onError(error: any, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on deleting manga",
                status: "error",
                description: error.message,
                variant: "solid",
                duration: 9000,
                isClosable: true
            })
        },
    });
    const download_ = useMutation({
        mutationFn: () => {
            toast({
                title: "Downloading manga...",
                status: "loading",
                duration: 9000
            });
            return Manga.download_manga(query.data!.get_id())
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: key
            })
        },
        onError(error: Error, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on downloading manga",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        },
    })
    if (query.isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <MangaElementDef2
            src={query.data!}
            isRefetching={query.isRefetching}
            refetch={query.refetch}
            download={download_.mutate}
            delete={delete_.mutate}
        />
    )
}

function MangaList(){}

const queryClient = new QueryClient();
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
//const id_toUse = "4be9338a-3402-4f98-b467-43fb56663927";
const to_use_group = Group_WithAllRelationShip.build_wANY(test_group.data[0]);

const to_use_manga = "87ffa375-bd2c-49ba-ba0c-6d78ea07c342";



test_area.render(
    <Chakra.ChakraProvider >
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools
                initialIsOpen={false}
            />
            <Chakra.Box
                margin={10}
            >

                <MangaElementDef2_withID mangaID={to_use_manga} />
                {/*    
                    <Group_Page src={to_use_group}/>
                */}

            </Chakra.Box>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
);
/**/