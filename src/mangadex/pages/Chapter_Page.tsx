import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Fullscreen from "react-full-screen";
import ReactHotkeys from "react-hot-keys";
import { HotkeysProvider } from "react-hotkeys-hook";
import { useQuery, useQueryClient } from "react-query";
import { Await, Link, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useHTTPClient } from "../../commons-res/components/HTTPClientProvider";
import Chapter_history from "../api/history/Chapter.history";
import { Lang } from "../api/internal/Utils";
import { Aggregate } from "../api/structures/Aggregate";
import { Chapter } from "../api/structures/Chapter";
import { Manga } from "../api/structures/Manga";
import ErrorEL1 from "../resources/componnents/error/ErrorEL1";
import { ErrorELAsync1 } from "../resources/componnents/Error_cmp";
import Flag_icons from "../resources/componnents/FlagIcons";
import MangaTitle from "../resources/componnents/mangas/v1/MangaTitle";

const ChapterNavigationModal = React.lazy(() => import("../resources/componnents/chapter/ChapterNavigationModal"));

const IsPingable = React.lazy(() => import("../resources/componnents/IsPingable"));

export function ChapterFullScreen(props: React.PropsWithChildren) {
    const FullscreenHandle = Fullscreen.useFullScreenHandle();
    return (
        <ReactHotkeys
            keyName="ctrl+f"
            onKeyDown={() => {
                FullscreenHandle.enter()
            }}
        >
            <Fullscreen.FullScreen
                handle={FullscreenHandle}
            >
                <Chakra.Box
                    height={"100vh"}
                    overflow={"scroll"}
                    onDoubleClick={() => {
                        FullscreenHandle.enter()
                    }}
                >
                    {
                        props.children
                    }
                </Chakra.Box>
            </Fullscreen.FullScreen>
        </ReactHotkeys>
    )
}

type ChapterPage_outlet_context = {
    images: Array<string>
}

export function useChapterPageOutletContext(): ChapterPage_outlet_context {
    let data = useOutletContext<ChapterPage_outlet_context>();
    return data;
}

function Chapter_Reading_mode(props: {
    chapterID: string
}) {
    const [type, setType] = React.useState("Lonstrip");
    const navigate = useNavigate();
    return (
        <Chakra.Menu>
            <Chakra.MenuButton>
                {type}
            </Chakra.MenuButton>
            <Chakra.MenuList>
                <Chakra.MenuItem onClick={() => {
                    setType("Longstrip");
                    navigate("/mangadex/chapter/" + props.chapterID);
                }}>Longstrip</Chakra.MenuItem>
                <Chakra.MenuItem onClick={() => {
                    setType("Swipper");
                    navigate("swipper");
                }}>Swipper</Chakra.MenuItem>
                <Chakra.MenuItem onClick={() => {
                    setType("Widestrip");
                    navigate("widestrip");
                }}>Widestrip</Chakra.MenuItem>
            </Chakra.MenuList>
        </Chakra.Menu>
    )
}

function Chapter_Previous_Next(props: {
    src: Chapter
}) {
    const client = useHTTPClient();
    const chapter_aggregate_queryKey = ["mdx-agreggate", props.src.getAggregateList_options()];
    const chapter_aggregate_query = useQuery<Aggregate, Error>(chapter_aggregate_queryKey, () => {
        return props.src.getAggregateList(client);
    }, {
        staleTime: 1000 * 60 * 10
    })
    return (
        <React.Fragment>
            {
                chapter_aggregate_query.isLoading || chapter_aggregate_query.isIdle ? (
                    <Chakra.ButtonGroup
                        colorScheme={"orange"}
                    >
                        <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                        <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                    </Chakra.ButtonGroup>
                ) : (
                    chapter_aggregate_query.isError ? (
                        <ErrorEL1 error={chapter_aggregate_query.error} />
                    ) : (
                        chapter_aggregate_query.isSuccess ? (
                            <Chakra.ButtonGroup
                                colorScheme={"orange"}
                            >
                                <React.Suspense
                                    fallback={
                                        <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                    }
                                >
                                    <Await
                                        resolve={props.src.get_previous(chapter_aggregate_query.data)}
                                        errorElement={
                                            <Chakra.Tooltip
                                                hasArrow
                                                label="No previous Chapter"
                                                aria-label="chapter-previous-label"
                                            >
                                                <Chakra.IconButton isDisabled aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                            </Chakra.Tooltip>
                                        }
                                    >
                                        {(getted: string) => (
                                            <Chakra.IconButton as={Link} to={"/mangadex/chapter/" + getted} aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                        )}
                                    </Await>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={
                                        <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                    }
                                >
                                    <Await
                                        resolve={props.src.get_next(chapter_aggregate_query.data)}
                                        errorElement={
                                            <Chakra.Tooltip
                                                hasArrow
                                                label="No next Chapter"
                                                aria-label="chapter-next-label"
                                            >
                                                <Chakra.IconButton isDisabled aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                            </Chakra.Tooltip>
                                        }
                                    >
                                        {(getted: string) => (
                                            <Chakra.IconButton as={Link} to={"/mangadex/chapter/" + getted} aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
                                        )}
                                    </Await>
                                </React.Suspense>
                            </Chakra.ButtonGroup>
                        ) : (<></>)
                    )
                )
            }
        </React.Fragment>
    )
}

export default function Chapter_Page() {
    let { id } = useParams();
    const history = new Chapter_history()
    const client = useHTTPClient();
    const queryClient = useQueryClient();
    React.useMemo(() => {
        queryClient.removeQueries("mdx-chapter:" + id!);
    }, [queryClient, id])
    const query = useQuery<Chapter, Error>("mdx-chapter:" + id!, () => {
        return Chapter.get_ChapterbyId(id!, client);
    }, {
        staleTime: Infinity
    })
    const mangaQuery = useQuery<Manga, Error>("mdx-manga:" + query.data?.get_manga_id(), () => {
        return Manga.getMangaByID(query.data!.get_manga_id(), client);
    }, {
        staleTime: Infinity,
        enabled: !!query.data
    })
    const chapter_data_images_queryKey = "mdx-chapter:" + id + "-data";
    const chapter_data_images_query = useQuery<Array<string>, Error>(chapter_data_images_queryKey, () => {
        return query.data!.get_dataImages(client)
    }, {
        staleTime: Infinity,
        enabled: !!query.data
    });
    if (query.isLoading) {
        return (
            <Chakra.Box
                display={"block"}
            >
                <Chakra.AbsoluteCenter>
                    <Chakra.Spinner
                        size="xl"
                        color='orange.500'
                        thickness='4px'
                    />
                </Chakra.AbsoluteCenter>
            </Chakra.Box>
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <>
            <React.Suspense>
                <Await
                    resolve={history.addChapter(query.data!.get_id())}
                    errorElement={<></>}
                >
                    <></>
                </Await>
            </React.Suspense>
            <HotkeysProvider>
                <Chakra.Box>
                    <Chakra.Box
                        as={Container}
                    >
                        <Chakra.Heading
                            size={{
                                base: "sm",
                                md: "md"
                            }}
                        >
                            <React.Suspense>
                                <Await
                                    resolve={query.data!.get_translated_Lang()}
                                >
                                    {
                                        (getted: Lang) => (
                                            <Flag_icons
                                                locale={getted.get_flag_icon()}
                                            />
                                        )
                                    }
                                </Await>
                            </React.Suspense>
                            &nbsp;
                            Chapter {query.data!.get_chapter()} {
                                query.data!.get_title() == null || query.data!.get_title() == "" ? (<></>) : (<> - {query.data!.get_title()}</>)
                            }
                        </Chakra.Heading>
                        <Chakra.Heading
                            size={"sm"}
                        >
                            {
                                mangaQuery.isLoading ? (
                                    <Chakra.Skeleton
                                        height={10}
                                    />
                                ) : (mangaQuery.isError ? (
                                    <ErrorEL1 error={mangaQuery.error} />
                                ) : (
                                    <Chakra.Link
                                        as={Link}
                                        to={"/mangadex/manga/" + mangaQuery.data?.get_id()}
                                    >
                                        <MangaTitle src={mangaQuery.data!} />
                                    </Chakra.Link>
                                )
                                )
                            }
                        </Chakra.Heading>
                        <Row>
                            <Col>
                                <Chakra.Center>
                                    <React.Suspense
                                        fallback={<Chakra.Spinner />}
                                    >
                                        <IsPingable
                                            client={client}
                                            onError={(query) => (
                                                <Chakra.Button
                                                    colorScheme={"orange"}
                                                    onClick={() => query.refetch()}
                                                >
                                                    Refresh
                                                </Chakra.Button>
                                            )}
                                            onLoading={
                                                <Chakra.Spinner />
                                            }
                                            onSuccess={() => (
                                                <Chapter_Previous_Next
                                                    src={query.data!}
                                                />
                                            )}
                                        />
                                    </React.Suspense>
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <Chakra.FormControl>
                                    <Chakra.FormLabel>Chapter Reading mode</Chakra.FormLabel>
                                    {
                                        query.isSuccess ? (
                                            <Chapter_Reading_mode chapterID={query.data.get_id()} />
                                        ) : (
                                            <Chakra.Skeleton
                                                height={"20px"}
                                                width={"30px"}
                                            />
                                        )
                                    }
                                </Chakra.FormControl>
                            </Col>
                            <Col>
                            <React.Suspense
                                fallback={<Chakra.Spinner></Chakra.Spinner>}
                            >
                                <ChapterNavigationModal chapter={query.data!} />
                            </React.Suspense>
                                
                            </Col>
                        </Row>
                    </Chakra.Box>
                    <ChapterFullScreen>
                        <>
                            {
                                chapter_data_images_query.isLoading || chapter_data_images_query.isIdle ? (
                                    <Chakra.AbsoluteCenter>
                                        <Chakra.Box>
                                            <Chakra.Spinner
                                                color={"orange"}
                                                thickness={"2px"}
                                            />
                                            <br />
                                            <Chakra.Text>Loading...</Chakra.Text>
                                        </Chakra.Box>
                                    </Chakra.AbsoluteCenter>
                                ) : (
                                    chapter_data_images_query.isSuccess ? (
                                        <Outlet context={{
                                            images: chapter_data_images_query.data
                                        }} />
                                    ) : (
                                        chapter_data_images_query.isError ? (
                                            <ErrorEL1 error={chapter_data_images_query.error} />
                                        ) : (
                                            <></>
                                        )
                                    )
                                )
                            }
                        </>
                    </ChapterFullScreen>
                </Chakra.Box>
            </HotkeysProvider>
        </>
    );
}
