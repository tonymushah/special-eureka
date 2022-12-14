import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet, Await, useNavigate, RouteObject, redirect } from "react-router-dom"
import { Container } from 'react-bootstrap';
import { Manga } from './api/structures/Manga';
import Home from "./pages/Home"
import { Content } from "./resources/componnents/SideBar"
import { ErrorELAsync1, ErrorELRouter } from './resources/componnents/Error_cmp';
import * as Chakra from "@chakra-ui/react"
import * as ChakraIcons from "@chakra-ui/icons"
import "./resources/css/manga/slider-manga.css";
import "./resources/Poppins/Poppins.css"
import MangaPage, { Chapters_, Covers_, Related_ } from "./pages/MangaPage"
import DownloadsLaoyut from './pages/download/layout';
import Chapter_Page from './pages/Chapter_Page';
import { listen, UnlistenFn } from '@tauri-apps/api/event'
import "./resources/css/basic-styles.css"
import "./resources/css/manga/thumbail-mg.css"
import "./resources/css/manga/CardsStyles.css"

export function useMangadexEvent() : [boolean, Function] {
const toast = Chakra.useToast();

    const [isListening, setListening] = React.useState<boolean>(false);

    const [mangadesk_info, setMangadesk_info] = React.useState<UnlistenFn>();

    const [mangadesk_warn, setMangadesk_warn] = React.useState<UnlistenFn>();

    const [mangadesk_debug, setMangadesk_debug] = React.useState<UnlistenFn>();

    const [mangadesk_error, setMangadesk_error] = React.useState<UnlistenFn>();

    const [mangadesk_trace, setMangadesk_trace] = React.useState<UnlistenFn>();

    function listenAll(){
        // mangadesk-api-info
        listen<{
                message: string
            }>("info", getted => {
            let getted_payload = getted.payload;
            toast({
                "title" : getted.event,
                "isClosable" : true,
                "status" : "info",
                "icon" : (<ChakraIcons.InfoIcon/>),
                "description" : getted_payload.message,
                "duration" : 10000
            });
            console.log(getted_payload.message)
        }).then(value => setMangadesk_info(value))
        .catch(error => console.error(error))
        .finally(() => console.log("setted mangadesk api info"));
        // mangadesk-api-warn
        listen<{
                message: string
            }>("warn", getted => {
            let getted_payload = getted.payload;
            toast({
                "title" : getted.event,
                "isClosable" : true,
                "status" : "warning",
                "description" : getted_payload.message,
                "duration" : 10000
            });
            console.log(getted_payload.message)
        }).then(value => setMangadesk_warn(value))
        .catch(error => console.error(error))
        .finally(() => console.log("setted mangadesk api warn"));
        // mangadesk-api-debug
        listen<{
                message: string
            }>("debug", getted => {
            let getted_payload = getted.payload;
            toast({
                "title" : getted.event,
                "isClosable" : true,
                "status" : "info",
                "description" : getted_payload.message,
                "duration" : 10000
            });
            console.log(getted_payload.message)
        }).then(value => setMangadesk_debug(value))
        .catch(error => console.error(error))
        .finally(() => console.log("setted mangadesk api debug"));
        //mangadesk-api-error
        listen<{
                message: string
            }>("error", getted => {
            let getted_payload = getted.payload;
            toast({
                "title" : getted.event,
                "isClosable" : true,
                "status" : "error",
                "description" : getted_payload.message,
                "duration" : 10000
            });
            console.log(getted_payload.message)
        }).then(value => setMangadesk_error(value))
        .catch(error => console.error(error))
        .finally(() => console.log("setted mangadesk api error"));
        //mangadesk-api-trace
        listen<{
                message: string
            }>("trace", getted => {
            let getted_payload = getted.payload;
            toast({
                "title" : getted.event,
                "isClosable" : true,
                "status" : "error",
                "icon" : (<ChakraIcons.InfoIcon/>),
                "description" : getted_payload.message,
                "duration" : 10000
            });
            console.log(getted_payload.message)
        }).then(value => setMangadesk_trace(value))
        .catch(error => console.error(error))
        .finally(() => console.log("setted mangadesk api trace"));
        setListening(true);
    }
    function unlistenAll(){
        try {
            mangadesk_info!();
            mangadesk_debug!();
            mangadesk_warn!();
            mangadesk_error!();
            mangadesk_trace!();
        } catch (error) {
            console.log(error);
        }finally{
            setListening(false);
        }
    }
    function toggleListening(){
        if(isListening){
            unlistenAll();
        }else{
            listenAll();
        }
    }
    return [isListening, toggleListening];
}

function useMangadexRouter(): RouteObject{
    const MangaDexPath: string = "/mangadex";

    

    const Router: RouteObject = {
        path: MangaDexPath,
        element: (
            <Content>
                <Outlet />
            </Content>
        ),
        errorElement: (<ErrorELRouter />),
        children: [
            {
                index: true,
                element: (<Home/>),
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
                            <MangaPage />
                        ),
                        children: [
                            {
                                index: true,
                                element: <Chapters_ />
                            },
                            {
                                path: "covers",
                                element: <Covers_ />
                            },
                            {
                                path: "related",
                                element: <Related_ />
                            }
                        ]
                    },
                    {
                        path: "random",
                        errorElement: (<ErrorELRouter />),
                        element: (
                            <React.Suspense
                                fallback={
                                    <Chakra.AbsoluteCenter>
                                        <Chakra.Spinner
                                            size="xl"
                                            color='orange.500'
                                            thickness='4px'
                                        />
                                    </Chakra.AbsoluteCenter>
                                }
                            >
                                <Await
                                    resolve={Manga.getRandom()}
                                    errorElement={<ErrorELAsync1 />}
                                >
                                    {(getted1: Manga) => {
                                        let navigate = useNavigate();
                                        React.useEffect(() => {
                                            /*navigate(MangaDexPath + "/manga/" + getted.get_id(), {
                                                replace : true
                                            });*/
                                            redirect(MangaDexPath + "/manga/" + getted1.get_id())
                                        });
                                        return (<></>);
                                    }}
                                </Await>
                            </React.Suspense>
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
                            <Chapter_Page />
                        )
                    }
                ]
            },
            {
                path: "download",
                errorElement: (<ErrorELRouter />),
                element: (
                    <Container>
                        <DownloadsLaoyut />
                    </Container>
                ),
                children: [

                ]
            },

        ]
    }

    return Router;
}

export default useMangadexRouter;
