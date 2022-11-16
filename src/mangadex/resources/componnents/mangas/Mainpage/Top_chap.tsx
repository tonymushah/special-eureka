import React from "react";
import { Manga } from "../../../../api/structures/Manga";
import { Accordion, Spinner, Button, Container, Row, Col, Placeholder } from "react-bootstrap";
import {Lang_and_Data, make_first_UpperCare, MangaLinksData } from "../../../../api/internal/Utils";
import { Author } from "../../../../api/structures/Author";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow } from "../Mainpage/boutons/tag_boutons";
import { Tag } from "../../../../api/structures/Tag";
import { AuthorCol } from "./boutons/author_boutons";
import { LinksRow } from "./boutons/links_boutons";
import { LAD_Tabs } from "./tabs/Lang_data_tabs";
import { Aggregate_box } from "./aggregate/Aggregate_box";
import * as Chakra from '@chakra-ui/react'
import { Aggregate } from "../../../../api/structures/Aggregate";
import { ErrorELAsync } from "../../Error_cmp";

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
    public async build_altTitle(): Promise<Array<React.ReactNode>>{
        let altTitle_inLang : Array<Lang_and_Data> = await Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title());
        let returns : Array<React.ReactNode> = Array<React.ReactNode>(altTitle_inLang.length);
        for (let index = 0; index < altTitle_inLang.length; index++) {
            const element = altTitle_inLang[index];
            returns[index] = (<span><span>{element.get_language().get_name()} :</span> {element.get_data()}</span>);
        }
        return returns;
    }
    public render(): React.ReactNode{
        let links : MangaLinksData = MangaLinksData.build_wAny(this.to_use.get_links());
        return (
            <div>
                <Row className="mg-top-content">
                    <Col>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header> {"Manga descriptions"} </Accordion.Header>
                                <Accordion.Body>
                                    <React.Suspense fallback={<Placeholder lg={12}></Placeholder>}>
                                        <Await
                                            resolve={Lang_and_Data.initializeByDesc(this.to_use.get_description())}
                                            errorElement={<p>Description not found</p>}
                                            children={(getted: Array<Lang_and_Data>) => {
                                                return (<LAD_Tabs src={getted}></LAD_Tabs>);
                                            }}
                                        />
                                    </React.Suspense>
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
                                    <Button className="mdP-bout m-1" variant="dark" size="sm">{make_first_UpperCare(this.to_use.get_demographic()!)}</Button>
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
                                <React.Suspense fallback={
                                    <Spinner animation="border">
                                    </Spinner>
                                }>
                                    <Await
                                        resolve={this.build_altTitle()}
                                        errorElement={<> </>}
                                        children={(getted: Array<React.ReactNode>) => {
                                            return (
                                                <>
                                                    {getted}
                                                </>
                                            );
                                        }}
                                    />
                                </React.Suspense>
                            </Row>
                            </Col>
                        <Col xs="12" sm="12" md="8" lg="8" className="d-sm-block">
                            <Container>
                                <React.Suspense fallback={
                                    <Chakra.Box m={2} bg="inherit">
                                        <div className=" text-center">
                                            <Spinner 
                                                animation="border"
                                            ></Spinner>
                                            <br/>
                                            <p>Loading chapters ...</p>
                                        </div>
                                    </Chakra.Box>
                                }>
                                    <Await
                                        resolve={this.to_use.aggregate_1_get()}
                                        errorElement={
                                            <ErrorELAsync/>
                                        }
                                        children={(getted: Aggregate) => {
                                            return (<Aggregate_box selected={0} src={getted} separator={3}></Aggregate_box>);
                                        }}
                                    />
                                </React.Suspense>
                            </Container>
                        </Col>
                    </Row>
                </div>
            );
        }
}