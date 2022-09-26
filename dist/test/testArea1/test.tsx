import React from "react";
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../mangadex/api/structures/Manga";
import MangaList from "../../mangadex/api/tsx/MangaList";
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import { Alt_title, Author_Artists, Offset_limits } from "../../mangadex/api/internal/Utils";
import { Cover } from "../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../mangadex/api/structures/Author";

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(
    <Card>
        <Card.Body>
            <Spinner animation="border"></Spinner>
        </Card.Body>
    </Card>
)

try {
    var manga_to_use: Manga = await Manga.getMangaByID("e83c326b-921b-45ff-bc0c-d667bbfe64cc");
    let manga_cover: Cover = await manga_to_use.get_cover_art();
    let authors : Array<Author> = await manga_to_use.get_author();
    let artists : Array<Author> = await manga_to_use.get_artist();
    let para: Array<React.ReactNode> = [];
    (new Author_Artists(authors, artists)).filtred.forEach(azo => {
        para.push(<span>{azo.get_Name()}</span>)
    })
    para.sort();
    let alt_title: string = (new Alt_title(manga_to_use.get_alt_title())).get_lang("en")![0];
    test_area.render(
        <Container>
            <Row>
                <Col md="3">
                    <Card>
                        <Card.Img src={manga_cover.get_CoverImage()}/>
                    </Card>
                </Col>
                <Col md="9">
                    <Container>
                        <Row>
                            <h2>{manga_to_use.get_title().en}</h2>
                        </Row>
                        <Row>
                            <p>{alt_title}</p>
                        </Row>
                        <Row>
                            <p>{para}</p>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    {manga_to_use.get_description().en}
                </Col>
            </Row>
        </Container>
    )
} catch (error) {
    test_area.render(
        <Card>
            <Card.Header>
                <h2>we have some error</h2>
            </Card.Header>
            <Card.Body>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header></Accordion.Header>
                        <Accordion.Body>
                            {error}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    )
}