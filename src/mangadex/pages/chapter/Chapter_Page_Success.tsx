import { get_chapter_groups } from "@mangadex/resources/hooks/ChapterStateHooks";
import * as Chakra from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HotkeysProvider } from "react-hotkeys-hook";
import { FaUsers } from "react-icons/fa";
import { useQuery, UseQueryOptions } from "react-query";
import { Await, Link, Outlet } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Chapter_history from "@mangadex/api/history/Chapter.history";
import { Alt_title, Lang } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Manga } from "@mangadex/api/structures/Manga";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import Download_Chapter_withHotkeys from "./Download_Chapter_withHotkeys";
import useChapterReadingModeOption from "./ChapterReadingMode/useChapterReadingModeOption";

const ReadingOptions = React.lazy(() => import("./ReadingOption"));

const ChapterFullScreen = React.lazy(() => import("./ChapterFullScreen"));

const ChapterReadingState = React.lazy(() => import("./ChapterReading_State"));

const MangaDexPath = getMangaDexPath();

function getMangaByID__(props: {
    manga_id: string,
    options?: Omit<UseQueryOptions<Manga, Error>, 'queryKey' | 'queryFn'>
}) {
    const { query } = get_manga_byId({
        mangaID: props.manga_id,
        options: props.options
    });
    return query;
}

export default function Chapter_Page_Success(props: {
    data: Chapter
}) {
    const history = new Chapter_history()
    const client = useHTTPClient();
    const mangaQuery = getMangaByID__({
        manga_id: props.data!.get_manga_id(),
        options: {
            staleTime: Infinity,
            enabled: !!props.data
        }
    });
    
    if (mangaQuery.isSuccess) {
        const { data } = mangaQuery;
        let title: string;
        if (data.get_title().en == null) {
            title = new Alt_title(data.get_alt_title()).get_quicklang()!;
        } else {
            title = data.get_title().en;
        }
        props.data.get_translated_Lang().then((lang) => {
            appWindow.setTitle(`${lang.get_name()} Chapter ${props.data.get_chapter()} - ${title} | Mangadex`).then();
        }).catch(() => {
            appWindow.setTitle(`Chapter ${props.data.get_chapter()} - ${title} | Mangadex`).then();
        })
    }
    const chapter_data_images_queryKey = "mdx-chapter:" + props.data.get_id() + "-data";
    const chapter_data_images_query = useQuery<Array<string>, Error>(chapter_data_images_queryKey, () => {
        return props.data.get_dataImages(client)
    }, {
        staleTime: Infinity,
        enabled: !!props.data
    });
    const chapter_groups = get_chapter_groups({
        chapter: props.data
    });
    return (
        <React.Fragment>
            <React.Suspense>
                <Await
                    resolve={history.addChapter(props.data!.get_id())}
                    errorElement={<></>}
                >
                    <></>
                </Await>
            </React.Suspense>
            <HotkeysProvider>
                <Download_Chapter_withHotkeys
                    chap_id={props.data.get_id()}
                />
                <Chakra.Box>
                    <Chakra.Box
                        as={Container}
                    >
                        <Row>
                            <Chakra.Heading
                                size={{
                                    base: "sm",
                                    md: "md"
                                }}
                                noOfLines={1}
                                fontFamily={"inherit"}
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
                                            to={MangaDexPath + "/manga/" + mangaQuery.data?.get_id()}
                                        >
                                            <MangaTitle src={mangaQuery.data!} />
                                        </Chakra.Link>
                                    )
                                    )
                                }
                            </Chakra.Heading>
                        </Row>
                        <Row>
                            <Chakra.HStack>
                                <FaUsers/>
                                {
                                    chapter_groups.map((query) => (
                                        <React.Fragment>
                                            {
                                                query.isSuccess ? (
                                                    <Chakra.Link as={Link} to={`${MangaDexPath}/groups/${query.data.get_id()}`}>
                                                        {
                                                            query.data.get_name()
                                                        }
                                                    </Chakra.Link>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </Chakra.HStack>
                        </Row>
                        <Row>
                            <Col>
                                <Chakra.Center>
                                    <React.Suspense>
                                        <Await
                                            resolve={props.data!.get_translated_Lang()}
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
                                    {
                                        props.data!.get_volume() != null ? (
                                            <>Volume {props.data!.get_volume()}</>
                                        ) : (<></>)
                                    }
                                    &nbsp;
                                    Chapter {props.data!.get_chapter()} {
                                        props.data!.get_title() == null || props.data!.get_title() == "" ? (<></>) : (<> - {props.data!.get_title()}</>)
                                    }
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <React.Suspense
                                    fallback={
                                        <Chakra.Skeleton
                                            width={"100%"}
                                            height={"10px"}
                                        />
                                    }
                                >
                                    <ChapterReadingState chapter={props.data}/>
                                </React.Suspense>
                            </Col>
                            <Col>
                                <React.Suspense
                                    fallback={<Chakra.Spinner></Chakra.Spinner>}
                                >
                                    <ReadingOptions
                                        chapter={props.data!}
                                    />
                                </React.Suspense>
                            </Col>
                        </Row>
                    </Chakra.Box>
                    <React.Suspense
                        fallback={
                            <Chakra.AbsoluteCenter>
                                <Chakra.Spinner />
                            </Chakra.AbsoluteCenter>
                        }
                    >
                        <ChapterFullScreen chapter={props.data}>
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
                                                images: chapter_data_images_query.data,
                                                chapter : props.data
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
                    </React.Suspense>
                </Chakra.Box>
            </HotkeysProvider>
        </React.Fragment>
    );
}
