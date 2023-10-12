import MangadexLogo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import { RouteObject } from "react-router-dom";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";
export { Mangadex_suspense__ } from "./resources/componnents/suspense";
import { Mangadex_suspense__ as Mangadex_SUS } from "./resources/componnents/suspense";
import { RouteErrorBoundary as ErrorBoundary } from "./resources/componnents/router/error/Boundary";

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
            ErrorBoundary,
            hasErrorBoundary: true
        };
    },
    children: [
        // Home
        {
            index: true,
            lazy: async () => {
                const { default: Component } = await import("@mangadex/pages/Home/Home");
                const { loader } = await import("@mangadex/pages/Home/loader");
                return {
                    Component,
                    ErrorBoundary,
                    loader
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
                        const { default: Component } = await import("@mangadex/pages/manga/index");
                        const { loader } = await import("@mangadex/pages/manga/loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
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
                                    ErrorBoundary,
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
                                    ErrorBoundary
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
                                    ErrorBoundary,
                                };
                            },
                        }
                    ]
                },
                // Random
                {
                    path: "random",
                    async lazy() {
                        const { loader } = await import("@mangadex/pages/manga/Random");
                        return {
                            ErrorBoundary,
                            loader
                        };
                    },
                }
            ]
        },
        // Chapter
        {
            path: "chapter",
            hasErrorBoundary: true,
            ErrorBoundary,
            children: [
                // Chapter by ID
                {
                    path: ":id",
                    async lazy() {
                        const { default: Component, loader } = await import("@mangadex/pages/chapter/Chapter_Page");
                        const { default: ErrorBoundary } = await import("@mangadex/pages/chapter/Chapter_Page/ErrorBoundary");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy() {
                                const ChapterReadingMode = await import("@mangadex/pages/chapter/ReadingMode");
                                return {
                                    Component: ChapterReadingMode.default,
                                    ErrorBoundary
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
                const { default: Component } = await import("@mangadex/pages/download/layout");
                return {
                    Component,
                    ErrorBoundary
                };
            },
            children: [
                // index
                {
                    index: true,
                    async lazy() {
                        const { default: Component, ErrorBoundary } = await import("@mangadex/pages/download");
                        const { loader } = await import("@mangadex/pages/download/loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
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
                        const { default: Component, loader } = await import("@mangadex/pages/groups/page/index");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy() {
                                const { default: Component } = await import("@mangadex/pages/groups/page/Details");
                                return {
                                    Component,
                                    ErrorBoundary,
                                    hasErrorBoundary: true
                                };
                            },
                        },
                        {
                            path: "titles",
                            async lazy() {
                                const { default: Component } = await import("@mangadex/pages/groups/page/Titles");
                                return {
                                    Component,
                                    ErrorBoundary
                                };
                            }
                        },
                        {
                            path: "feeds",
                            async lazy() {
                                const { default: Component } = await import("@mangadex/pages/groups/page/Feeds");
                                return {
                                    Component,
                                    ErrorBoundary
                                };
                            },
                        }
                    ]
                },
                // Search
                {
                    path: "search",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/groups/search");
                        return {
                            Component,
                            ErrorBoundary
                        };
                    }
                }
            ]
        },
        // Titles
        {
            path: "titles",
            ErrorBoundary,
            children: [
                // Recently Added
                {
                    path: "recently-added",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/titles/RecentlyAdded");
                        const { loader } = await import("@mangadex/pages/titles/RecentlyAdded/loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    }
                },
                // Latest Updates
                {
                    path: "latest-updates",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/titles/LatestUpdates");
                        const { loader } = await import("@mangadex/pages/titles/LatestUpdates/loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    }
                },
                // Recently Popular
                {
                    path: "recently-popular",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/titles/RecentlyPopular");
                        return {
                            Component,
                            ErrorBoundary
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
                            ErrorBoundary
                        };
                    }
                }
            ]
        },
        // Author
        {
            path: "author",
            ErrorBoundary,
            children: [
                {
                    path: ":id",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/author");
                        const { loader } = await import("@mangadex/pages/author/loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    },
                },
                {
                    path: "search",
                    async lazy() {
                        const { default: Component } = await import("@mangadex/pages/author/search");
                        return {
                            Component,
                            ErrorBoundary
                        };
                    }
                }
            ]
        },
        // User 
        {
            path: "user",
            ErrorBoundary,
            children: [
                {
                    path: ":id",
                    async lazy() {
                        const { default: Component, loader } = await import("@mangadex/pages/user/UserPage+Loader");
                        return {
                            Component,
                            ErrorBoundary,
                            loader
                        };
                    },
                    children: [
                        {
                            index: true,
                            async lazy() {
                                const { default: UserPageInfo } = await import("@mangadex/pages/user/UserPageInfo");
                                return {
                                    Component: UserPageInfo,
                                    ErrorBoundary
                                };
                            },
                        },
                        {
                            path: "feed",
                            async lazy() {
                                const { default: Component } = await import("@mangadex/pages/user/UserPageFeed");
                                return {
                                    Component,
                                    ErrorBoundary
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
            async lazy() {
                const Kuru_Credits = await import("@mangadex/resources/componnents/kuru_kuru/index");
                return {
                    Component: Kuru_Credits.default,
                    ErrorBoundary
                };
            }
        }
    ]
};

export default useMangadexRouter;