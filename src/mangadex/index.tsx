import * as Chakra from "@chakra-ui/react";
import MangadexLogo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { RouteObject } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { ErrorELRouter } from "@mangadex/resources/componnents/Error_cmp";
import "@mangadex/resources/Poppins/Poppins.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";

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

const MangaPage = React.lazy(() => import("@mangadex/pages/manga/index"));

const Chapters_ = React.lazy(() => import("@mangadex/pages/manga/Chapters_"));

const Covers_ = React.lazy(() => import("@mangadex/pages/manga/Covers_"));

const Related_ = React.lazy(() => import("@mangadex/pages/manga/Related_"));

const DownloadsLaoyut = React.lazy(() => import("@mangadex/pages/download/layout"));

const Download_Index_Page = React.lazy(() => import("@mangadex/pages/download"));

const Chapter_Page = React.lazy(() => import("@mangadex/pages/chapter/Chapter_Page"));

const Home = React.lazy(() => import("@mangadex/pages/Home/Home"));

const Longstrip = React.lazy(() => import("@mangadex/pages/ChapterReadingMode/Longstrip"));

const Widestrip = React.lazy(() => import("@mangadex/pages/ChapterReadingMode/Widestrip"));

const SinglePage = React.lazy(() => import("@mangadex/pages/ChapterReadingMode/SwipperMode"));

const Group_Page_ = React.lazy(() => import("@mangadex/pages/groups/index"));

const Group_Search = React.lazy(() => import("@mangadex/pages/groups/search"));

const Random_Manga = React.lazy(() => import("@mangadex/pages/manga/Random"));

const RecentlyAdded = React.lazy(() => import("@mangadex/pages/titles/RecentlyAdded"));

const Author_Page_index = React.lazy(() => import("@mangadex/pages/author"));

const IsPingable_default_client = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_default_client"));

const LatestUpdates = React.lazy(() => import("@mangadex/pages/titles/LatestUpdates"));

const RecentlyPopularPage = React.lazy(() => import("@mangadex/pages/titles/RecentlyPopular"));

const MangadexLayout = React.lazy(() => import("@mangadex/pages/Layout"));

const UserPage = React.lazy(() => import("@mangadex/pages/user/UserPage+Loader"));

const UserPageInfo = React.lazy(() => import("@mangadex/pages/user/UserPageInfo"));

const UserPageFeed = React.lazy(() => import("@mangadex/pages/user/UserPageFeed"));

const AuthorSearch = React.lazy(() => import("@mangadex/pages/author/search"));

const Manga_Search = React.lazy(() => import("@mangadex/pages/manga/Search"));


export function Mangadex_suspense__() {
    return (
        <Chakra.Box
            width={"full"}
            height={"100vh"}
        >
            <Chakra.Center>
                <Chakra.Spinner
                    size={"lg"}
                    thickness={"2px"}
                    color={"orange"}
                />
            </Chakra.Center>
        </Chakra.Box>
    );
}

export function useTrackEvent(name: string, payload?: {
    [key: string]: string | number
}) {
    React.useMemo(() => {
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
                <Mangadex_suspense__ />
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

function useMangadexRouter(): RouteObject {
    const Router: RouteObject = {
        path: MangaDexPath,
        element: (
            <Mangadex_suspense>
                <MangadexLayout />
            </Mangadex_suspense>
        ),
        errorElement: (<ErrorELRouter />),
        children: [
            // Home
            {
                index: true,
                element: (
                    <Mangadex_suspense>
                        <Home />
                    </Mangadex_suspense>
                ),
                errorElement: (<ErrorELRouter />)
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
                        element: (
                            <MyErrorBounderies>
                                <Mangadex_suspense>
                                    <MangaPage />
                                </Mangadex_suspense>
                            </MyErrorBounderies>
                        ),
                        children: [
                            // Top Chap
                            {
                                index: true,
                                element: (
                                    <MyErrorBounderies>
                                        <Mangadex_suspense>
                                            <Chapters_ />
                                        </Mangadex_suspense>
                                    </MyErrorBounderies>
                                )
                            },
                            // Covers
                            {
                                path: "covers",
                                element: (
                                    <Mangadex_suspense>
                                        <Covers_ />
                                    </Mangadex_suspense>
                                )
                            },
                            // Related
                            {
                                path: "related",
                                element: (
                                    <Mangadex_suspense>
                                        <Related_ />
                                    </Mangadex_suspense>
                                )
                            }
                        ]
                    },
                    // Random
                    {
                        path: "random",
                        errorElement: (<ErrorELRouter />),
                        element: (
                            <Mangadex_suspense>
                                <Random_Manga />
                            </Mangadex_suspense>
                        )
                    }
                ]
            },
            // Chapter
            {
                path: "chapter",
                errorElement: (<ErrorELRouter />),
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
                            // Longstrip
                            {
                                index: true,
                                element: (
                                    <Mangadex_suspense>
                                        <Chakra.Box>
                                            <Longstrip />
                                        </Chakra.Box>
                                    </Mangadex_suspense>
                                )
                            },
                            // SinglePage
                            {
                                path: "swipper",
                                element: (
                                    <Mangadex_suspense>
                                        <Chakra.Box>
                                            <SinglePage />
                                        </Chakra.Box>
                                    </Mangadex_suspense>
                                )
                            },
                            // Widestrip
                            {
                                path: "widestrip",
                                element: (
                                    <Mangadex_suspense>
                                        <Chakra.Box>
                                            <Widestrip />
                                        </Chakra.Box>
                                    </Mangadex_suspense>
                                )
                            }
                        ]
                    }
                ]
            },
            // Download
            {
                path: "download",
                errorElement: (<ErrorELRouter />),
                element: (
                    <Chakra.Box
                        margin={10}
                    >
                        <Mangadex_suspense>
                            <DownloadsLaoyut />
                        </Mangadex_suspense>
                    </Chakra.Box>
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
                        )
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
                        )
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
                                        <Mangadex_suspense__ />
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
            }
        ]
    };

    return Router;
}

export default useMangadexRouter();