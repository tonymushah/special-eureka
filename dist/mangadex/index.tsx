import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-pro-sidebar/dist/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Link, Routes, useHref, Outlet, defer, createBrowserRouter, createRoutesFromElements, RouterProvider, useRouteError} from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Container, Row, Col, Stack, Button, Navbar, NavbarBrand, Nav, Modal, Spinner } from 'react-bootstrap';
import * as ReactIcons from "react-icons";
import { ExtLink } from '../commons-res/components/ExtLink';
import { Api_Request } from './api/internal/Api_Request';
import { Manga } from './api/structures/Manga';
import Home from "./pages/Home"
import { Content } from "./resources/componnents/SideBar"
import { ErrorELRouter } from './resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import "./resources/css/manga/slider-manga.css";
import { List } from './api/structures/List';
import "./resources/Poppins/Poppins.css"
import MangaPage from "./pages/MangaPage"

const MangaDexPath: string = "/mangadex/";
const app = ReactDOM.createRoot(document.getElementById("app")!);
app.render(
    <Container className='align-content-center'>
        <Spinner animation="grow"></Spinner>
    </Container>
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={MangaDexPath} element={
            <Content>
                <Outlet/>
            </Content>
            }
        >
            <Route index 
                loader={
                    async () => {
                        let loader1 = List.getListByID("4be9338a-3402-4f98-b467-43fb56663927");
                        return defer({
                            loader1
                        })
                    }
                } 
                element={
                    <Home/>
                }
                errorElement={
                    <ErrorELRouter/>
                }
            />
            <Route
                path='manga'
            >
                <Route path=":id"
                    errorElement={
                        <ErrorELRouter/>
                    }
                    element={<MangaPage/>}
                >

                </Route>
            </Route>
        </Route>
    )
);
app.render(
    <Chakra.ChakraProvider>
        <Chakra.Box
            fontFamily={"Poppins"}
        >
            <RouterProvider router={router}/>
        </Chakra.Box>
    </Chakra.ChakraProvider>
);
