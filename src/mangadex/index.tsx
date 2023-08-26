//import * as Chakra from "@chakra-ui/react";
import MangadexLogo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import { RouteObject } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
//import { ErrorELRouter } from "@mangadex/resources/componnents/Error_cmp";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";
//import { Group_Page_Suspense } from "./resources/componnents/groups/Group_Page";
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

/*

const MangaPage = React.lazy(() => import("@mangadex/pages/manga/index"));

const Chapters_ = React.lazy(() => import("@mangadex/pages/manga/Chapters_"));

const Covers_ = React.lazy(() => import("@mangadex/pages/manga/Covers_"));

const Related_ = React.lazy(() => import("@mangadex/pages/manga/Related_"));

const DownloadsLaoyut = React.lazy(() => import("@mangadex/pages/download/layout"));

const Download_Index_Page = React.lazy(() => import("@mangadex/pages/download"));

const Chapter_Page = React.lazy(() => import("@mangadex/pages/chapter/Chapter_Page"));

const Home = React.lazy(() => import("@mangadex/pages/Home/Home"));

const Chapter_Reading = React.lazy(() => import("@mangadex/pages/ChapterReadingMode"));

const Group_Page_ = React.lazy(() => import("@mangadex/pages/groups/page/index"));

const Group_Page_Details = React.lazy(() => import("@mangadex/pages/groups/page/Details"));

const Group_Page_Titles = React.lazy(() => import("@mangadex/pages/groups/page/Titles"));

const Group_Page_Feeds = React.lazy(() => import("@mangadex/pages/groups/page/Feeds"));

const Group_Search = React.lazy(() => import("@mangadex/pages/groups/search"));

const Random_Manga = React.lazy(() => import("@mangadex/pages/manga/Random"));

const RecentlyAdded = React.lazy(() => import("@mangadex/pages/titles/RecentlyAdded"));

const Author_Page_index = React.lazy(() => import("@mangadex/pages/author"));

const LatestUpdates = React.lazy(() => import("@mangadex/pages/titles/LatestUpdates"));

const RecentlyPopularPage = React.lazy(() => import("@mangadex/pages/titles/RecentlyPopular"));

const MangadexLayout = React.lazy(() => import("@mangadex/pages/Layout"));

const UserPage = React.lazy(() => import("@mangadex/pages/user/UserPage+Loader"));

const UserPageInfo = React.lazy(() => import("@mangadex/pages/user/UserPageInfo"));

const UserPageFeed = React.lazy(() => import("@mangadex/pages/user/UserPageFeed"));

const AuthorSearch = React.lazy(() => import("@mangadex/pages/author/search"));

const Manga_Search = React.lazy(() => import("@mangadex/pages/manga/Search"));

const Kuru_Credits = React.lazy(() => import("@mangadex/resources/componnents/kuru_kuru/index"));

*/

const IsPingable_default_client = React.lazy(() => import("@mangadex/resources/componnents/IsPingable_default_client"));

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
            ErrorBoundary: MyErrorBounderies,
            hasErrorBoundary: true
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
                    ErrorBoundary: MyErrorBounderies
                };
            },
        },
        // Manga
        {
            path: "manga",
            children: [
                // Manga by ID
                {
                    path: ":id",
                    async lazy() {
                        const MangaPage = await import("@mangadex/pages/manga/index");
                        return {
                            Component: MangaPage.default,
                            ErrorBoundary: MyErrorBounderies,
                        };
                    },
                    children: [
                        // Top Chap
                        {
                            index: true,
                            async lazy() {
                                const Chapters_ = await import("@mangadex/pages/manga/Chapters_");
                                return {
                                    Component: Chapters_.default,
                                    ErrorBoundary: MyErrorBounderies,
                                    hasErrorBoundary: true
                                };
                            },
                        },
                        // Covers
                        {
                            path: "covers",
                            async lazy() {
                                const Covers_ = await import("@mangadex/pages/manga/Covers_");
                                return {
                                    Component: Covers_.default,
                                    hasErrorBoundary: true,
                                    ErrorBoundary: MyErrorBounderies
                                };
                            },
                        },
                        // Related
                        {
                            path: "related",
                            async lazy() {
                                const Related_ = await import("@mangadex/pages/manga/Related_");
                                return {
                                    Component: Related_.default,
                                    hasErrorBoundary: true,
                                    ErrorBoundary: MyErrorBounderies
                                };
                            },
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
                            Component: Random_Manga.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    },
                }
            ]
        },
        // Chapter
        {
            path: "chapter",
            hasErrorBoundary: true,
            ErrorBoundary: MyErrorBounderies,
            children: [
                // Chapter by ID
                {
                    path: ":id",
                    async lazy() {
                        const Chapter_Page = await import("@mangadex/pages/chapter/Chapter_Page");
                        return {
                            Component: Chapter_Page.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy() {
                                const ChapterReadingMode = await import("@mangadex/pages/chapter/ReadingMode");
                                return {
                                    Component: ChapterReadingMode.default,
                                    ErrorBoundary: MyErrorBounderies
                                };
                            }
                        },
                    ]
                }
            ]
        },
        // Download
        {
            path: "download",
            async lazy() {
                const DownloadLayout = await import("@mangadex/pages/download/layout");
                return {
                    Component: DownloadLayout.default,
                    ErrorBoundary: MyErrorBounderies
                };
            },
            children: [
                // index
                {
                    index: true,
                    async lazy() {
                        const Download_Index_Page = await import("@mangadex/pages/download");
                        return {
                            Component: Download_Index_Page.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    }
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
                    async lazy() {
                        const Group_Page_ = await import("@mangadex/pages/groups/page/index");
                        return {
                            Component: Group_Page_.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy() {
                                const Group_Page_Details = await import("@mangadex/pages/groups/page/Details");
                                return {
                                    Component: Group_Page_Details.default,
                                    ErrorBoundary: MyErrorBounderies,
                                    hasErrorBoundary: true
                                };
                            },
                        },
                        {
                            path: "titles",
                            async lazy() {
                                const Group_Page_Titles = await import("@mangadex/pages/groups/page/Titles");
                                return {
                                    Component: Group_Page_Titles.default,
                                    ErrorBoundary: MyErrorBounderies
                                };
                            }
                        },
                        {
                            path: "feeds",
                            async lazy() {
                                const Group_Page_Feeds = await import("@mangadex/pages/groups/page/Feeds");
                                return {
                                    Component: Group_Page_Feeds.default,
                                    ErrorBoundary: MyErrorBounderies
                                };
                            },
                        }
                    ]
                },
                // Search
                {
                    path: "search",
                    async lazy() {
                        const Group_Search = await import("@mangadex/pages/groups/search");
                        return {
                            Component: Group_Search.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    }
                }
            ]
        },
        // Titles
        {
            path: "titles",
            ErrorBoundary: MyErrorBounderies,
            children: [
                // Recently Added
                {
                    path: "recently-added",
                    async lazy() {
                        const RecentlyAdded = await import("@mangadex/pages/titles/RecentlyAdded");
                        return {
                            Component: RecentlyAdded.default,
                            ErrorBoundary: MyErrorBounderies,
                        };
                    }
                },
                // Latest Updates
                {
                    path: "latest-updates",
                    async lazy() {
                        const LatestUpdates = await import("@mangadex/pages/titles/LatestUpdates");
                        return {
                            Component: LatestUpdates.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    }
                },
                // Recently Popular
                {
                    path: "recently-popular",
                    async lazy() {
                        const RecentlyPopularPage = await import("@mangadex/pages/titles/RecentlyPopular");
                        return {
                            Component: RecentlyPopularPage.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    }
                },
                // Manga Search
                {
                    path: "search",
                    async lazy() {
                        const Manga_Search = await import("@mangadex/pages/manga/Search");
                        return {
                            Component: Manga_Search.default,
                            ErrorBoundary: MyErrorBounderies
                        };
                    }
                }
            ]
        },
        // Author
        {
            path: "author",
            ErrorBoundary: MyErrorBounderies,
            children: [
                {
                    path: ":id",
                    async lazy() {
                        const Author_Page_index = await import("@mangadex/pages/author");
                        return {
                            element: (
                                <Mangadex_suspense>
                                    <IsPingable_default_client
                                        onLoading={
                                            <Mangadex_SUS />
                                        }
                                        onSuccess={() => (
                                            <Mangadex_suspense>
                                                <Author_Page_index.default />
                                            </Mangadex_suspense>
                                        )}
                                    />
                                </Mangadex_suspense>
                            ),
                            ErrorBoundary : MyErrorBounderies
                        };
                    },
                },
                {
                    path: "search",
                    async lazy(){
                        const AuthorSearch = await import("@mangadex/pages/author/search");
                        return {
                            Component : AuthorSearch.default,
                            ErrorBoundary : MyErrorBounderies
                        };
                    }
                }
            ]
        },
        // User 
        {
            path: "user",
            ErrorBoundary : MyErrorBounderies,
            children: [
                {
                    path: ":user_id",
                    async lazy(){
                        const UserPage = await import("@mangadex/pages/user/UserPage+Loader");
                        return {
                            Component : UserPage.default,
                            ErrorBoundary : MyErrorBounderies
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy(){
                                const UserPageInfo = await import("@mangadex/pages/user/UserPageInfo");
                                return {
                                    Component : UserPageInfo.default,
                                    ErrorBoundary : MyErrorBounderies
                                };
                            },
                        },
                        {
                            path: "feed",
                            async lazy(){
                                const UserPageFeed = await import("@mangadex/pages/user/UserPageFeed");
                                return {
                                    Component : UserPageFeed.default,
                                    ErrorBoundary : MyErrorBounderies
                                };
                            }
                        }
                    ]
                }
            ]
        },
        // Kuru
        {
            path: "kuru",
            async lazy(){
                const Kuru_Credits = await import("@mangadex/resources/componnents/kuru_kuru/index");
                return {
                    Component : Kuru_Credits.default,
                    ErrorBoundary : MyErrorBounderies
                };
            }
        }
    ]
};

export default useMangadexRouter;