import React from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../mangadex/api/structures/Manga";
import MangaList from "../../mangadex/api/tsx/MangaList";
import { Accordion, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import { Alt_title, Author_Artists, Offset_limits } from "../../mangadex/api/internal/Utils";
import { Cover } from "../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../mangadex/api/structures/Author";
import { Cover_Image_ }from "./Image_";
import { Volume_ } from "./Volume";
import "flag-icons/css/flag-icons.min.css";

export class Manga_Page{
    public render(): React.ReactNode{
        let manga_cover: string = "./imgs/cover_image1.jpg";
        let authors : string = "Authors";
        let artists : string = "Artists";
        let para: Array<React.ReactNode> = [];
        para.push(<span>{authors} </span>);
        para.push(<span>{artists}</span>);
        
        var volumes: Array<Volume_> = new Array<Volume_>(Math.floor(Math.random() * 100) + 1);
        for (let index = 0; index < volumes.length; index++) {
            volumes[index] = new Volume_();
        }
        let volumes_: Array<React.ReactNode> = new Array<React.ReactNode>(volumes.length);
        for (let index = 0; index < volumes.length; index++) {
            volumes_[index] = volumes[index].render(index);
        }
        return (
            <Container>
                <Row className=" overflow-hidden h-50 " id="mg-pHeader"  >
                    <div id="mg-container-cover">
                        <img src={manga_cover} id="cover-big"/>
                    </div>
                    <div id="mg-container-content">
                        <Row className="top-100">
                            <Col xs="5" sm="4" md="3" lg="3" xl="3">
                                <Cover_Image_ id="top-cover" state={false} src={manga_cover}/>
                            </Col>
                            <Col xs="7" sm="8" md="9" lg="9" xl="9">
                                <Container>
                                    <Row className="mb-xs-1 mb-lg-5 mb-sm-1">
                                        <h1 >{"Manga Title dfhdsfouhdfsuodfhuidsfgidsfsgdf"}</h1>
                                    </Row>
                                    <Row className="mb-lg-5 mb-sm-1">
                                        <h5>{"Manga Alternative Title"}</h5>
                                    </Row>
                                    <Row>
                                        <div className=" d-block h-100" >
                                            <p> </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div id="cover-cutter">
                                            <p> </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <span>{para} difhuisfuhfiushidfhsdhfuisdfhuih</span>
                                    </Row>
                                    <Row>
                                        <p>some themes</p>
                                    </Row>
                                    <Row>
                                        <span> State </span>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                </div>
            </Row>
            <Row className="mg-top-content">
                <Col>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> {"Manga descriptions"} </Accordion.Header>
                            <Accordion.Body>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, quaerat dolorum, rem minus aliquam, esse eligendi aut porro earum voluptates assumenda ut eos voluptate laboriosam. Aliquam quis earum expedita esse.</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            <Row className="mg-top-content">
                <Col md="4" lg="4" className="d-sm-block">
                    <Row>
                        <Col>
                            <h5>Authors</h5>
                            <div className="d-md-inline">
                                <Button variant="dark" size="sm"> Author 1 </Button>
                                <span> </span>
                                <Button variant="dark" size="sm"> Author 2 </Button>
                            </div>
                        </Col>
                        <Col>
                            <h5>Artists</h5>
                            <div className="d-md-inline">
                                <Button variant="dark" size="sm"> Artist 1 </Button>
                                <span> </span>
                                <Button variant="dark" size="sm"> Artist 2 </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h5>Genres</h5>
                        <div className="d-md-inline">
                            <Button variant="dark" size="sm"> Genre 1 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Genre 2 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Genre 3 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Genre 4 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Genre 5 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Genre 6 </Button>
                        </div>
                    </Row>
                    <Row>
                        <h5>Themes</h5>
                        <div className="d-md-inline">
                            <Button variant="dark" size="sm"> Theme 1 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Theme 2 </Button>
                        </div>
                    </Row>
                    <Row>
                        <h5>Demographics</h5>
                        <div className="d-md-inline">
                            <Button variant="dark" size="sm"> Demographic 1 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Demographic 2 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Demographic 3 </Button>
                        </div>
                    </Row>
                    <Row>
                        <h5>Read or Buy</h5>
                        <div className="d-md-inline">
                            <Button variant="dark" size="sm"> Link 1 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 2 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 3 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 4 </Button>
                        </div>
                    </Row>
                    <Row>
                        <h5>Track</h5>
                        <div className="d-md-inline">
                            <Button variant="dark" size="sm"> Link 1 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 2 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 3 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 4 </Button>
                            <span> </span>
                            <Button variant="dark" size="sm"> Link 5 </Button>
                        </div>
                    </Row>
                    <Row>
                        <h5>Atlernative Titles</h5>
                        <p><span className={"fi " + "fi-jp"}> </span> Japan title </p>
                        <p><span className={"fi " + "fi-gb"}> </span> English title </p>
                        <p><span className={"fi " + "fi-fr"}></span> French title </p>
                    </Row>
                </Col>
                <Col xs="12" sm="12" md="8" lg="8" className="d-sm-block">
                    <Container>
                        {volumes_}
                    </Container>
                </Col>
            </Row>
        </Container>
        );
    }
}
/*
*/