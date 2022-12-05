import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import { Route, Outlet, defer, Await, useNavigate, createRoutesFromElements, RouteObject } from "react-router-dom"
import { Container } from 'react-bootstrap';
import { Manga } from './api/structures/Manga';
import Home from "./pages/Home"
import { Content } from "./resources/componnents/SideBar"
import { ErrorELAsync1, ErrorELRouter } from './resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import "./resources/css/manga/slider-manga.css";
import "./resources/Poppins/Poppins.css"
import MangaPage, { Chapters_, Covers_, Related_ } from "./pages/MangaPage"
import Chapter_Page from './pages/Chapter_Page';
import DownloadsLaoyut from './pages/download/layout';

(
    <>
        <Route
            index
            /*loader={
                async () => {
                    let loader1 = List.getListByID("4be9338a-3402-4f98-b467-43fb56663927");
                    return defer({
                        loader1
                    })
                }
            }*/
            element={
                <Home />
            }
            errorElement={
                <ErrorELRouter />
            }
        />

        <Route
            path='manga'
            errorElement={
                <ErrorELRouter></ErrorELRouter>
            }
        >
            <Route path=":id"
                errorElement={
                    <ErrorELRouter />
                }
                loader={
                    async ({ params }) => {
                        let loader1 = await Manga.getMangaByID(params.id!);
                        return defer({
                            loader1
                        })
                    }
                }
                element={<MangaPage />}
            >
                <Route
                    index
                    errorElement={
                        <ErrorELRouter />
                    }
                    element={<Chapters_ />}
                />
                <Route
                    path="covers"
                    errorElement={
                        <ErrorELRouter />
                    }
                    element={<Covers_ />}
                />
                <Route
                    path="related"
                    errorElement={<ErrorELRouter />}
                    element={<Related_ />}
                />
            </Route>
            <Route path="random"
                errorElement={
                    <ErrorELRouter />
                }
                element={
                    <React.Suspense
                        fallback={
                            <Chakra.AbsoluteCenter>
                                <Chakra.Spinner
                                    size="xl"
                                />
                            </Chakra.AbsoluteCenter>
                        }
                    >
                        <Await
                            resolve={Manga.getRandom()}
                            errorElement={<ErrorELAsync1 />}
                        >
                            {(getted: Manga) => {
                                let navigate = useNavigate();
                                React.useEffect(() => {
                                    navigate(MangaDexPath + "manga/" + getted.get_id());
                                });
                                return (<></>);
                            }}
                        </Await>
                    </React.Suspense>
                }
            >
            </Route>
        </Route>
        <Route
            path='chapter'
            errorElement={<ErrorELRouter />}
        >
            <Route
                path=':id'
                errorElement={<ErrorELRouter />}
                element={
                    <Chapter_Page />
                }

            >
            </Route>
        </Route>
        <Route
            path="download"
            element={
                <Container>
                    <DownloadsLaoyut />
                </Container>
            }
        >
        </Route>
    </>
)