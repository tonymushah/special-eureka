import React from "react";
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../dist/mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../dist/mangadex/api/structures/Manga";
import MangaList from "../../dist/mangadex/api/tsx/MangaList";
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import El_Manga_simple2 from "../../dist/mangadex/api/tsx/Manga2";
import { Alt_title, Author_Artists, Offset_limits } from "../../dist/mangadex/api/internal/Utils";
import { Cover } from "../../dist/mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../dist/mangadex/api/structures/Author";
import "font-awesome/css/font-awesome.css"

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render((new Manga_Page()).render());