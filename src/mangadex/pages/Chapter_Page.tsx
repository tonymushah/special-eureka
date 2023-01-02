import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Fullscreen from "react-full-screen";
import ReactHotkeys from "react-hot-keys";
import { HotkeysProvider } from "react-hotkeys-hook";
import { useQuery } from "react-query";
import { Await, Link, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Chapter_history from "../api/history/Chapter.history";
import { Lang } from "../api/internal/Utils";
import { Chapter } from "../api/structures/Chapter";
import { Manga } from "../api/structures/Manga";
import ChapterNavigationModal from "../resources/componnents/chapter/ChapterNavigationModal";
import ErrorEL1 from "../resources/componnents/error/ErrorEL1";
import { ErrorELAsync1 } from "../resources/componnents/Error_cmp";
import Flag_icons from "../resources/componnents/FlagIcons";
import MangaTitle from "../resources/componnents/mangas/v1/MangaTitle";

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
    chapterID: Array<string>
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

export default function Chapter_Page() {
    let { id } = useParams();
    const history = new Chapter_history()
    const query = useQuery("mdx-chapter:" + id!, () => {
        return Chapter.get_ChapterbyId(id!);
    }, {
        staleTime: Infinity
    })
    const mangaQuery = useQuery("mdx-manga:" + query.data?.get_manga_id(), () => {
        return Manga.getMangaByID(query.data?.get_manga_id());
    }, {
        staleTime: Infinity
    })
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
                                    <Chakra.ButtonGroup
                                        colorScheme={"orange"}
                                    >
                                        <React.Suspense
                                            fallback={
                                                <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                                            }
                                        >
                                            <Await
                                                resolve={query.data!.get_previous()}
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
                                                resolve={query.data!.get_next()}
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
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <Chakra.FormControl>
                                    <Chakra.FormLabel>Chapter Reading mode</Chakra.FormLabel>
                                    <Chapter_Reading_mode chapterID={query.data?.get_id()} />
                                </Chakra.FormControl>
                            </Col>
                            <Col>
                                <ChapterNavigationModal chapter={query.data!} />
                            </Col>
                        </Row>
                    </Chakra.Box>
                    <ChapterFullScreen>
                        <React.Suspense
                            fallback={
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
                            }
                        >
                            <Await
                                resolve={query.data?.get_dataImages()}
                                errorElement={<ErrorELAsync1 />}
                            >
                                {(getted: Array<string>) => (
                                    <Outlet context={{
                                        images: getted
                                    }} />
                                )}
                            </Await>
                        </React.Suspense>
                    </ChapterFullScreen>
                </Chakra.Box>
            </HotkeysProvider>
        </>
    );
}
