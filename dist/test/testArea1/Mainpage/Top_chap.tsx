import React, { useState } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../../mangadex/api/structures/Manga";
import { Accordion, Tabs, Tab,Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { Alt_title, Author_Artists, Offset_limits, Lang_and_Data, Languages, Lang, make_first_UpperCare, MangaLinksData } from "../../../mangadex/api/internal/Utils";
import { Cover } from "../../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../../mangadex/api/structures/Author";
import { Cover_Image_ }from "../Mainpage/Image_";
import { Volume_ } from "../Volume";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow, TagButton } from "../Mainpage/boutons/tag_boutons";
import { Tag } from "../../../mangadex/api/structures/Tag";
import { AuthorCol } from "./boutons/author_boutons";
import { LinksRow } from "./boutons/links_boutons";
import { ExtLink } from "../../../commons-res/components/ExtLink";

type MangaPageProps = {
    src: Manga
}
export class Top_Chaps extends React.Component<MangaPageProps>{
    private to_use: Manga;
    //private _cover: Cover;
    public constructor(props : MangaPageProps){
        super(props);
        this.to_use = this.props.src;
    }
    public render(): React.ReactNode{
        var volumes: Array<Volume_> = new Array<Volume_>(Math.floor(Math.random() * 100) + 1);
        for (let index = 0; index < volumes.length; index++) {
            volumes[index] = new Volume_();
        }
        let volumes_: Array<React.ReactNode> = new Array<React.ReactNode>(volumes.length);
        for (let index = 0; index < volumes.length; index++) {
            volumes_[index] = volumes[index].render(index);
        }
        let links : MangaLinksData = MangaLinksData.build_wAny(this.to_use.get_links());
        return (
            <div>
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
                            <>
                                <React.Suspense fallback={
                                    <Col>
                                        <Placeholder lg={10}></Placeholder>
                                    </Col>
                                }>
                                    <Await
                                        resolve={this.to_use.get_author()}
                                        errorElement={
                                        <>
                                            <div> </div>
                                        </>
                                        }
                                        children={(getted: Array<Author>) => {
                                            return (<AuthorCol title="Authors" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                            <>
                                <React.Suspense fallback={
                                    <Col>
                                        <Placeholder lg={10}></Placeholder>
                                    </Col>
                                }>
                                    <Await
                                        resolve={this.to_use.get_artist()}
                                        errorElement={
                                        <>
                                            <div> </div>
                                        </>
                                        }
                                        children={(getted: Array<Author>) => {
                                            return (<AuthorCol title="Artistists" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                        </Row>
                        <>
                            <React.Suspense fallback={
                                <Row>
                                </Row>
                            }>
                                <Await
                                    resolve={this.to_use.get_async_genre()}
                                    errorElement={<div> </div>}
                                    children={(getted: Array<Tag>) => {
                                        return (<TagRow title="Genre" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                            <>
                                <React.Suspense fallback={
                                    <Row>
                                    </Row>
                                }>
                                    <Await
                                        resolve={this.to_use.get_async_theme()}
                                        errorElement={
                                        <>
                                            <div> </div>
                                        </>
                                        }
                                        children={(getted: Array<Tag>) => {
                                            return (<TagRow title="Theme" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                            <>
                                <React.Suspense fallback={
                                    <Row>
                                    </Row>
                                }>
                                    <Await
                                        resolve={this.to_use.get_async_format()}
                                        errorElement={<div> </div>}
                                        children={(getted: Array<Tag>) => {
                                            return (<TagRow title="Format" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                                        
                            <>
                                <React.Suspense fallback={
                                    <Row>
                                    </Row>
                                }>
                                    <Await
                                        resolve={this.to_use.get_async_content()}
                                        errorElement={<div> </div>}
                                        children={(getted: Array<Tag>) => {
                                            return (<TagRow title="Content" src={getted}/>);
                                        }}
                                    />
                                </React.Suspense>
                            </>
                            <Row>
                                <h5>Demographics</h5>
                                <div className="d-md-inline">
                                    <Button className="m-1" variant="dark" size="sm">{make_first_UpperCare(this.to_use.get_demographic()!)}</Button>
                                </div>
                            </Row>
                            <>
                                <LinksRow src={links.read_or_buy()} title="Read or Buy"/>
                            </>
                            <>
                                <LinksRow src={links.track()} title="Track"/>
                            </>
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
                </div>
            );
        }
}