import * as Chakra from "@chakra-ui/react";
import MangadexLogo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { RouteObject } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { ErrorELRouter } from "@mangadex/resources/componnents/Error_cmp";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";
import { Group_Page_Suspense } from "./resources/componnents/groups/Group_Page";
export { Mangadex_suspense__ } from "./resources/componnents/suspense";

import { Mangadex_suspense__ as Mangadex_SUS } from "./resources/componnents/suspense";

const MangaDexPath = "/mangadex";

export function getMangaDexPath() {
    return MangaDexPath;
}

export function getProjectPath() {
    return getMangaDexPath();
}

export function getLogo() {
    return MangadexLogo;
}

//const MangaPage = React.lazy(() => import("@mangadex/pages/manga/index"));

//const Chapters_ = React.lazy(() => import("@mangadex/pages/manga/Chapters_"));

//const Covers_ = React.lazy(() => import("@mangadex/pages/manga/Covers_"));

//const Related_ = React.lazy(() => import("@mangadex/pages/manga/Related_"));

const DownloadsLaoyut = React.lazy(() => import("@mangadex/pages/download/layout"));

const Download_Index_Page = React.lazy(() => import("@mangadex/pages/download"));

const Chapter_Page = React.lazy(() => import("@mangadex/pages/chapter/Chapter_Page"));

//const Home = React.lazy(() => import("@mangadex/pages/Home/Home"));

const Chapter_Reading = React.lazy(() => import("@mangadex/pages/ChapterReadingMode"));

const Group_Page_ = React.lazy(() => import("@mangadex/pages/groups/page/index"));

const Group_Page_Details = React.lazy(() => import("@mangadex/pages/groups/page/Details"));

const Group_Page_Titles = React.lazy(() => import("@mangadex/pages/groups/page/Titles"));

const Group_Page_Feeds = React.lazy(() => import("@mangadex/pages/groups/page/Feeds"));

const Group_Search = React.lazy(() => import("@mangadex/pages/groups/search"));

//const Random_Manga = React.lazy(() => import("@mangadex/pages/manga/Random"));

const RecentlyAdded = React.lazy(() => import("@mangadex/pages/titles/RecentlyAdded"));

const Author_Page_index = React.lazy(() => import("@mangadex/pages/author"));

const IsPingable_default_client = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_default_client"));

const LatestUpdates = React.lazy(() => import("@mangadex/pages/titles/LatestUpdates"));

const RecentlyPopularPage = React.lazy(() => import("@mangadex/pages/titles/RecentlyPopular"));

//const MangadexLayout = React.lazy(() => import("@mangadex/pages/Layout"));

const UserPage = React.lazy(() => import("@mangadex/pages/user/UserPage+Loader"));

const UserPageInfo = React.lazy(() => import("@mangadex/pages/user/UserPageInfo"));

const UserPageFeed = React.lazy(() => import("@mangadex/pages/user/UserPageFeed"));

const AuthorSearch = React.lazy(() => import("@mangadex/pages/author/search"));

const Manga_Search = React.lazy(() => import("@mangadex/pages/manga/Search"));

const Kuru_Credits = React.lazy(() => import("@mangadex/resources/componnents/kuru_kuru/index"));

export function useMangaDexPath() {
    return React.useMemo(() => getMangaDexPath(), []);
}

export function useTrackEvent(name: string, payload?: {
    [key: string]: string | number
}) {
    React.useEffect(() => {
        trackEvent(name, payload);
    }, []);
}

export function trackEvent(name: string, payload?: {
    [key: string]: string | number
}) {
    aptabaseTrackEvent(name, {
        "website": "mangadex",
        "location": window.location.href,
        "date": new Date().toISOString(),
        ...payload
    });
}

export function Mangadex_suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Mangadex_SUS />
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}


const useMangadexRouter: RouteObject = {
    path: MangaDexPath,
    lazy: async () => {
        const Layout = await import("@mangadex/pages/Layout");
        return {
            Component: Layout.default,
            ErrorBoundary : MyErrorBounderies,
            hasErrorBoundary : true  
        };
    },
    children: [
        // Home
        {
            index: true,
            lazy: async () => {
                const Home = await import("@mangadex/pages/Home/Home");
                return {
                    Component: Home.default,
                    ErrorBoundary : MyErrorBounderies
                };
            },
            /*
            element: (
                <Mangadex_suspense>
                    <Home />
                </Mangadex_suspense>
            ),
            */
            errorElement: (<ErrorELRouter />),
        },
        // Manga
        {
            path: "manga",
            errorElement: (<ErrorELRouter />),
            children: [
                // Manga by ID
                {
                    path: ":id",
                    errorElement: (<ErrorELRouter />),
                    async lazy(){
                        const MangaPage = await import("@mangadex/pages/manga/index");
                        return {
                            Component : MangaPage.default,
                            ErrorBoundary : MyErrorBounderies,
                        };
                    },
                    /*
                    element: (
                        <MyErrorBounderies>
                            <Mangadex_suspense>
                                <MangaPage />
                            </Mangadex_suspense>
                        </MyErrorBounderies>
                    ),
                    */
                    children: [
                        // Top Chap
                        {
                            index: true,
                            async lazy(){
                                const Chapters_ = await import("@mangadex/pages/manga/Chapters_");
                                return {
                                    Component: Chapters_.default,
                                    ErrorBoundary : MyErrorBounderies,
                                    hasErrorBoundary : true  
                                };
                            },
                            /*
                            element: (
                                <MyErrorBounderies>
                                    <Mangadex_suspense>
                                        <Chapters_ />
                                    </Mangadex_suspense>
                                </MyErrorBounderies>
                            ),*/
                            
                        },
                        // Covers
                        {
                            path: "covers",
                            async lazy(){
                                const Covers_ = await import("@mangadex/pages/manga/Covers_");
                                return {
                                    Component : Covers_.default,
                                    hasErrorBoundary : true,
                                    ErrorBoundary : MyErrorBounderies
                                };
                            },
                            /*
                            element: (
                                <Mangadex_suspense>
                                    <Covers_ />
                                </Mangadex_suspense>
                            )
                            */
                        },
                        // Related
                        {
                            path: "related",
                            async lazy(){
                                const Related_ = await import("@mangadex/pages/manga/Related_");
                                return {
                                    Component : Related_.default,
                                    hasErrorBoundary : true,
                                    ErrorBoundary : MyErrorBounderies
                                };
                            },
                            /*
                            element: (
                                <Mangadex_suspense>
                                    <Related_ />
                                </Mangadex_suspense>
                            )
                            */
                        }
                    ]
                },
                // Random
                {
                    path: "random",
                    async lazy() {
                        const Random_Manga = await import("@mangadex/pages/manga/Random");
                        return {
                            hasErrorBoundary: true,
                            Component : Random_Manga.default,
                            ErrorBoundary : MyErrorBounderies
                        };
                    },
                    /* 
                    element: (
                        <Mangadex_suspense>
                            <Random_Manga />
                        </Mangadex_suspense>
                    )
                    */
                }
            ]
        },
        // Chapter
        {
            path: "chapter",
            hasErrorBoundary : true,
            ErrorBoundary : MyErrorBounderies,
            children: [
                // Chapter by ID
                {
                    path: ":id",
                    errorElement: (<ErrorELRouter />),
                    element: (
                        <MyErrorBounderies>
                            <Mangadex_suspense>
                                <Chapter_Page />
                            </Mangadex_suspense>
                        </MyErrorBounderies>
                    ),
                    children: [
                        {
                            index: true,
                            element: (
                                <Mangadex_suspense>
                                    <Chakra.Box>
                                        <Chapter_Reading />
                                    </Chakra.Box>
                                </Mangadex_suspense>
                            )
                        },
                    ]
                }
            ]
        },
        // Download
        {
            path: "download",
            errorElement: (<ErrorELRouter />),
            element: (
                <Mangadex_suspense>
                    <DownloadsLaoyut />
                </Mangadex_suspense>
            ),
            children: [
                // index
                {
                    index: true,
                    element: (
                        <Mangadex_suspense>
                            <Chakra.Box>
                                <Download_Index_Page />
                            </Chakra.Box>
                        </Mangadex_suspense>
                    )
                }
            ]
        },
        // Group
        {
            path: "group",
            children: [
                // Group by ID
                {
                    path: ":id",
                    element: (
                        <Mangadex_suspense>
                            <Group_Page_ />
                        </Mangadex_suspense>
                    ),
                    children: [
                        {
                            index: true,
                            element: (
                                <Group_Page_Suspense>
                                    <Group_Page_Details />
                                </Group_Page_Suspense>
                            )
                        },
                        {
                            path: "titles",
                            element: (
                                <Group_Page_Suspense>
                                    <Group_Page_Titles />
                                </Group_Page_Suspense>
                            )
                        },
                        {
                            path: "feeds",
                            element: (
                                <Group_Page_Suspense>
                                    <Group_Page_Feeds />
                                </Group_Page_Suspense>
                            )
                        }
                    ]
                },
                // Search
                {
                    path: "search",
                    element: (
                        <Mangadex_suspense>
                            <Group_Search />
                        </Mangadex_suspense>
                    )

                }
            ]
        },
        // Titles
        {
            path: "titles",
            children: [
                // Recently Added
                {
                    path: "recently-added",
                    element: (
                        <Mangadex_suspense>
                            <RecentlyAdded />
                        </Mangadex_suspense>
                    )
                },
                // Latest Updates
                {
                    path: "latest-updates",
                    element: (
                        <Mangadex_suspense>
                            <LatestUpdates />
                        </Mangadex_suspense>
                    ),
                },
                // Recently Popular
                {
                    path: "recently-popular",
                    element: (
                        <Mangadex_suspense>
                            <RecentlyPopularPage />
                        </Mangadex_suspense>
                    )
                },
                // Manga Search
                {
                    path: "search",
                    element: (
                        <MyErrorBounderies>
                            <Mangadex_suspense>
                                <Manga_Search />
                            </Mangadex_suspense>
                        </MyErrorBounderies>
                    )
                }
            ]
        },
        // Author
        {
            path: "author",
            errorElement: (<ErrorELRouter />),
            children: [
                {
                    path: ":id",
                    errorElement: (<ErrorELRouter />),
                    element: (
                        <Mangadex_suspense>
                            <IsPingable_default_client
                                onLoading={
                                    <Mangadex_SUS />
                                }
                                onSuccess={() => (
                                    <Mangadex_suspense>
                                        <Author_Page_index />
                                    </Mangadex_suspense>
                                )}
                            />
                        </Mangadex_suspense>
                    )
                },
                {
                    path: "search",
                    element: (
                        <Mangadex_suspense>
                            <AuthorSearch />
                        </Mangadex_suspense>
                    )
                }
            ]
        },
        // User 
        {
            path: "user",
            errorElement: (
                <ErrorELRouter />
            ),
            children: [
                {
                    path: ":user_id",
                    errorElement: (<ErrorELRouter />),
                    element: (
                        <Mangadex_suspense>
                            <UserPage />
                        </Mangadex_suspense>
                    ),
                    children: [
                        {
                            index: true,
                            errorElement: (<ErrorELRouter />),
                            element: (
                                <Mangadex_suspense>
                                    <UserPageInfo />
                                </Mangadex_suspense>
                            )
                        },
                        {
                            path: "feed",
                            errorElement: (
                                <ErrorELRouter />
                            ),
                            element: (
                                <Mangadex_suspense>
                                    <UserPageFeed />
                                </Mangadex_suspense>
                            )
                        }
                    ]
                }
            ]
        },
        // Kuru
        {
            path: "kuru",
            element: (
                <Mangadex_suspense>
                    <Kuru_Credits />
                </Mangadex_suspense>
            )
        }
    ]
};

export default useMangadexRouter;