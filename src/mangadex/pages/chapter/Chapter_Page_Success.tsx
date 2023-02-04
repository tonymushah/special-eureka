import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HotkeysProvider } from "react-hotkeys-hook";
import { useQuery, UseQueryOptions } from "react-query";
import { Await, Link, Outlet } from "react-router-dom";
import { getMangaDexPath } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import Chapter_history from "../../api/history/Chapter.history";
import { Lang } from "../../api/internal/Utils";
import { Chapter } from "../../api/structures/Chapter";
import { Manga } from "../../api/structures/Manga";
import ErrorEL1 from "../../resources/componnents/error/ErrorEL1";
import Flag_icons from "../../resources/componnents/FlagIcons";
import MangaTitle from "../../resources/componnents/mangas/v1/MangaTitle";
import { get_manga_byId } from "../../resources/hooks/MangaStateHooks";
import Download_Chapter_withHotkeys from "./Download_Chapter_withHotkeys";

const Chapter_Previous_Next = React.lazy(() => import("./Chapter_Previous_Next"));

const Chapter_Reading_mode = React.lazy(() => import("./ChapterReadingMode"));

const ChapterFullScreen = React.lazy(() => import("./ChapterFullScreen"));

const ChapterNavigationModal = React.lazy(() => import("../../resources/componnents/chapter/ChapterNavigationModal"));

const IsPingable = React.lazy(() => import("../../resources/componnents/IsPingable"));

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
    const chapter_data_images_queryKey = "mdx-chapter:" + props.data.get_id() + "-data";
    const chapter_data_images_query = useQuery<Array<string>, Error>(chapter_data_images_queryKey, () => {
        return props.data.get_dataImages(client)
    }, {
        staleTime: Infinity,
        enabled: !!props.data
    });
    return (
        <>
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
                        <Chakra.Heading
                            size={{
                                base: "sm",
                                md: "md"
                            }}
                        >
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
                            Chapter {props.data!.get_chapter()} {
                                props.data!.get_title() == null || props.data!.get_title() == "" ? (<></>) : (<> - {props.data!.get_title()}</>)
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
                                        to={MangaDexPath + "/manga/" + mangaQuery.data?.get_id()}
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
                                                <React.Suspense
                                                    fallback={
                                                        <Chakra.Center>
                                                            <Chakra.Spinner />
                                                        </Chakra.Center>
                                                    }
                                                >
                                                    <Chapter_Previous_Next
                                                        src={props.data!}
                                                    />
                                                </React.Suspense>
                                            )}
                                        />
                                    </React.Suspense>
                                </Chakra.Center>
                            </Col>
                            <Col>
                                <Chakra.FormControl>
                                    <Chakra.FormLabel>Chapter Reading mode</Chakra.FormLabel>

                                    <React.Suspense
                                        fallback={
                                            <Chakra.Center>
                                                <Chakra.Spinner />
                                            </Chakra.Center>
                                        }
                                    >
                                        <Chapter_Reading_mode chapterID={props.data.get_id()} />
                                    </React.Suspense>

                                </Chakra.FormControl>
                            </Col>
                            <Col>
                                <React.Suspense
                                    fallback={<Chakra.Spinner></Chakra.Spinner>}
                                >
                                    <ChapterNavigationModal chapter={props.data!} />
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
                    </React.Suspense>
                </Chakra.Box>

            </HotkeysProvider>
        </>
    );
}
