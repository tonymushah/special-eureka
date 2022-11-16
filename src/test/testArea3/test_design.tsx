import React from "react";
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../mangadex/api/structures/Manga";
//import MangaList from "../../mangadex/api/tsx/MangaList";
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import { Alt_title, Author_Artists, Offset_limits } from "../../mangadex/api/internal/Utils";
import { Cover } from "../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../mangadex/api/structures/Author";
import "font-awesome/css/font-awesome.css"
import { Chapter } from "../../mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import { Chapter_page } from "./Chapter_page";
import { Await, useAsyncError } from "react-router-dom";

function ErrorEL(props){
    let error : any = useAsyncError();
    return(
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    )
}
let ChapterToUse = await Chapter.get_ChapterbyId("1f69dbd8-4bd6-4e36-a4e4-0f7faa18beec");

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(
    <Chakra.ChakraProvider>

                        {/*<React.Suspense fallback={
                            <Chakra.Spinner></Chakra.Spinner>
                        }>
                            <Await
                                resolve={
                                    ChapterToUse.get_previous()
                                }
                                errorElement={
                                    <ErrorEL></ErrorEL>
                                }
                                children={
                                    (getted2 : any) => {
                                        return (
                                            <Chakra.Text>{JSON.stringify(getted2)}</Chakra.Text>
                                        );
                                }}
                            />
                        </React.Suspense>*/}
                    
        <Chapter_page src={ChapterToUse}/>
    </Chakra.ChakraProvider>
)