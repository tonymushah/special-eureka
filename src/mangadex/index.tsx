import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import React from 'react';
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet, RouteObject } from "react-router-dom";
import "../commons-res/fontawesome-free-6.1.2-web/css/all.css";
import MyErrorBounderies from "./resources/componnents/error/MyErrorBounderies";
import { ErrorELRouter } from './resources/componnents/Error_cmp';
import "./resources/css/basic-styles.css";
import "./resources/Poppins/Poppins.css";

const MangaDexPath: string = "/mangadex";

export function getMangaDexPath() {
    return MangaDexPath
};

const MangaPage = React.lazy(() => import("./pages/manga/index"));

const Chapters_ = React.lazy(() => import("./pages/manga/Chapters_"))

const Covers_ = React.lazy(() => import("./pages/manga/Covers_"))

const Related_ = React.lazy(() => import("./pages/manga/Related_"));

const DownloadsLaoyut = React.lazy(() => import('./pages/download/layout'));

const Download_Index_Page = React.lazy(() => import('./pages/download'));

const Chapter_Page = React.lazy(() => import('./pages/chapter/Chapter_Page'))

const Home = React.lazy(() => import("./pages/Home/Home"));

const Longstrip = React.lazy(() => import('./pages/ChapterReadingMode/Longstrip'));

const Widestrip = React.lazy(() => import('./pages/ChapterReadingMode/Widestrip'));

const Content = React.lazy(() => import("./resources/componnents/SideBar"));

const SinglePage = React.lazy(() => import("./pages/ChapterReadingMode/SwipperMode"));

const Group_Page_ = React.lazy(() => import("./pages/groups/index"));

const Group_Search = React.lazy(() => import("./pages/groups/search"));

const Random_Manga = React.lazy(() => import("./pages/manga/Random"));

const RecentlyAdded = React.lazy(() => import("./pages/titles/RecentlyAdded"));

export function Mangadex_suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
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
            <MyErrorBounderies>
                <ProSidebarProvider>
                    <React.Suspense
                        fallback={
                            <Chakra.Box
                                width={"100%"}
                                height={"100vh"}
                            >
                                <Chakra.AbsoluteCenter>
                                    <Chakra.Spinner
                                        size="xl"
                                        color='orange.500'
                                        thickness='4px'
                                    />
                                </Chakra.AbsoluteCenter>
                            </Chakra.Box>
                        }
                    >
                        <Content>
                            <Outlet />
                        </Content>
                    </React.Suspense>
                </ProSidebarProvider>
            </MyErrorBounderies>
        ),
        errorElement: (<ErrorELRouter />),
        children: [
            {
                index: true,
                element: (
                    <Mangadex_suspense>
                        <Home />
                    </Mangadex_suspense>
                ),
                errorElement: (<ErrorELRouter />)
            },
            {
                path: "manga",
                errorElement: (<ErrorELRouter />),
                children: [
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
                            {
                                path: "covers",
                                element: (
                                    <Mangadex_suspense>
                                        <Covers_ />
                                    </Mangadex_suspense>
                                )
                            },
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
            {
                path: "chapter",
                errorElement: (<ErrorELRouter />),
                children: [
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
                                            <Longstrip />
                                        </Chakra.Box>
                                    </Mangadex_suspense>
                                )
                            },
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
            {
                path: "group",
                children: [
                    {
                        path: ":id",
                        element: (
                            <Mangadex_suspense>
                                <Group_Page_ />
                            </Mangadex_suspense>
                        )
                    },
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
            {
                path: "titles",
                children: [
                    {
                        path: "recently-added",
                        element: (
                            <Mangadex_suspense>
                                <RecentlyAdded />
                            </Mangadex_suspense>
                        )
                    }
                ]
            }
        ]
    }

    return Router;
}

export default useMangadexRouter();
