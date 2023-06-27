import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Chapter_history from "@mangadex/api/history/Chapter.history";
import { Alt_title, Lang } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import { getMangaDexPath } from "@mangadex/index";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import { useChapterFullscreen } from "@mangadex/resources/componnents/chapter/fullscreen/Context";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { get_chapter_groups } from "@mangadex/resources/hooks/ChapterStateHooks";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { Await, Link, Outlet } from "react-router-dom";
import Download_Chapter_withHotkeys from "./Download_Chapter_withHotkeys";

const ReadingOptions = React.lazy(() => import("./ReadingOption"));

const ChapterFullScreen = React.lazy(() => import("./ChapterFullScreen"));

const ChapterReadingState = React.lazy(() => import("./ChapterReading_State"));

const ReadingDrawer = React.lazy(() => import("./ReadingOptionDrawer"));

const MangaDexPath = getMangaDexPath();

function getMangaByID__(props: {
    manga_id: string,
    options?: Omit<UseQueryOptions<GetMangaByIDResponse, Error>, "queryKey" | "queryFn">
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

    const history = new Chapter_history();
    const client = useHTTPClient();
    const mangaQuery = getMangaByID__({
        manga_id: props.data!.get_manga_id(),
        options: {
            staleTime: Infinity,
            enabled: !!props.data
        }
    });

    if (mangaQuery.isSuccess) {
        const data = mangaQuery.data.manga;
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
        });
    }
    const chapter_data_images_queryKey = ["mdx", "chapter", props.data.get_id(), "data"];
    const chapter_data_images_query = useQuery<Array<string>, Error>(chapter_data_images_queryKey, () => {
        return props.data.get_dataImages(client);
    }, {
        staleTime: Infinity,
        enabled: !!props.data
    });
    const chapter_groups = get_chapter_groups({
        chapter: props.data
    });
    const fullscreen = useChapterFullscreen();
    React.useEffect(() => {
        history.addChapter(props.data.get_id());
    }, [props.data]);
    React.useEffect(() => {
        return () => {
            fullscreen.update(false);
        };
    }, []);
    function Chapter_on_non_FullScreen() {
        return (
            <Chakra.Box
                as={ChakraContainer}
            >
                <Chakra.VStack>
                    <React.Fragment>
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
                                        to={MangaDexPath + "/manga/" + mangaQuery.data?.manga.get_id()}
                                    >
                                        <MangaTitle src={mangaQuery.data.manga!} />
                                    </Chakra.Link>
                                )
                                )
                            }
                        </Chakra.Heading>
                    </React.Fragment>
                    <React.Fragment>
                        <Chakra.HStack>
                            <FaUsers />
                            {
                                chapter_groups.map((query, index) => (
                                    <React.Fragment key={`mdx-chapter-success-${props.data.get_id()}-${index}`}>
                                        {
                                            query.isSuccess ? (
                                                <Chakra.Link as={Link} to={`${MangaDexPath}/group/${query.data.get_id()}`}>
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
                    </React.Fragment>
                    <Chakra.HStack>
                        <React.Fragment>
                            <Chakra.Center>
                                <React.Suspense>
                                    <Await
                                        resolve={props.data.get_translated_Lang()}
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
                                    props.data.get_volume() != null ? (
                                        <>Volume {props.data.get_volume()}</>
                                    ) : (<></>)
                                }
                                &nbsp;
                                Chapter {props.data.get_chapter()} {
                                    props.data.get_title() == null || props.data.get_title() == "" ? (<></>) : (<> - {props.data.get_title()}</>)
                                }
                            </Chakra.Center>
                        </React.Fragment>
                        <React.Fragment>
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        width={"100%"}
                                        height={"10px"}
                                    />
                                }
                            >
                                <ChapterReadingState chapter={props.data} />
                            </React.Suspense>
                        </React.Fragment>
                        <React.Fragment>
                            <React.Suspense
                                fallback={<Chakra.Spinner></Chakra.Spinner>}
                            >
                                <ReadingOptions />
                            </React.Suspense>
                        </React.Fragment>
                    </Chakra.HStack>
                </Chakra.VStack>

            </Chakra.Box>
        );
    }
    return (
        <React.Fragment>
            <React.Suspense>
                <ReadingDrawer chapter={props.data} />
            </React.Suspense>
            <Download_Chapter_withHotkeys
                chap_id={props.data.get_id()}
            />
            <Chakra.Box
                height={"fit-content"}
            >
                {
                    fullscreen.query.data == false ? (
                        <Chapter_on_non_FullScreen />
                    ) : (
                        <></>
                    )
                }
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
                                chapter_data_images_query.isLoading || chapter_data_images_query.isPaused ? (
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
                                            chapter: props.data
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
        </React.Fragment >
    );
}
