import React from "react";
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request";
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
import { Manga_Page } from "./Manga_Page";
import ReactJson from "react-json-view";
import "font-awesome/css/font-awesome.css";
import { Aggregate_box } from "./Mainpage/aggregate/Aggregate_box";
import { Volume } from "../../mangadex/api/structures/Volume";
import { Chapters, Chapter_withAllIncludes } from "../../mangadex/api/structures/Chapter";

import { Box, ChakraProvider } from "@chakra-ui/react";

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(
    <div className="text-center">
        <Spinner animation="border">
        </Spinner>
        <br/>
        <span>Loading manga ...</span>
    </div>
);
const manga_tUse: Manga = await Manga.getMangaByID("e83c326b-921b-45ff-bc0c-d667bbfe64cc");
test_area.render(
    <ChakraProvider>
        <Box fontFamily={"Poppins"}>
            <Manga_Page src={manga_tUse}></Manga_Page>
        </Box>
    </ChakraProvider>
);
//var aed = await manga_tUse.get_async_format();
/*test_area.render(
    <div className="text-center">
        <Spinner animation="border">
        </Spinner>
        <br/>
        <span>Loading aggregate ...</span>
    </div>
);
await manga_tUse.aggregate_1();
test_area.render(
    <div className="text-center">
        <Spinner animation="border">
        </Spinner>
        <br/>
        <span>Initializing chapters ...</span>
    </div>
);
test_area.render(
    <ChakraProvider>
        <Box fontFamily={"Poppins"}>
            <Aggregate_box separator={3} src={manga_tUse.get_aggregate()}/>
        </Box>
    </ChakraProvider>
)
*/