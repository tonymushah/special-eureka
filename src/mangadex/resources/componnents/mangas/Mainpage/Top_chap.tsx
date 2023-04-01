import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Await } from "react-router-dom";
import { Lang_and_Data, make_first_UpperCare, MangaLinksData } from "../../../../api/internal/Utils";
import { Manga } from "../../../../api/structures/Manga";
import { Tag } from "../../../../api/structures/Tag";
import { TagRow } from "../Mainpage/boutons/tag_boutons";
import { MangaPageProps } from "../Manga_Page";
import { LinksRow } from "./boutons/links_boutons";


const Offline_Chapters = React.lazy(() => import("./top_chap/Offline_Chapters"));

const Online_Chapter = React.lazy(() => import("./top_chap/Online_Chapter"));

const CollapseHeight = React.lazy(() => import("./top_chap/CollapseHeight"));

const Author_Artists = React.lazy(() => import("./top_chap/Author_Artists"));

const Top_Chaps_Desc_Part = React.lazy(() => import("./top_chap/Top_Chaps_Desc_Part"));

export class Top_Chaps extends React.Component<MangaPageProps>{
    private to_use: Manga;
    //private _cover: Cover;
    public constructor(props: MangaPageProps) {
        super(props);
        this.to_use = this.props.src;
    }
    public async build_altTitle(): Promise<Array<React.ReactNode>> {
        const altTitle_inLang: Array<Lang_and_Data> = await Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title());
        const returns: Array<React.ReactNode> = Array<React.ReactNode>(altTitle_inLang.length);
        for (let index = 0; index < altTitle_inLang.length; index++) {
            const element = altTitle_inLang[index];
            returns[index] = (
                <span>
                    <Chakra.Tooltip
                        hasArrow
                        label={element.get_language().get_name()}
                    >
                        <span className={"fi fi-" + element.get_language().get_flag_icon().toLowerCase()}></span>
                    </Chakra.Tooltip>
                    &nbsp;
                    {element.get_data()}
                </span>);
        }
        return returns;
    }
    public render(): React.ReactNode {
        let links: MangaLinksData | null = null;
        try {
            links = MangaLinksData.build_wAny(this.to_use.get_links());
        } catch (error) {
        }

        return (
            <div>

                <Row className="mg-top-content">

                    <Col>
                        <React.Suspense
                            fallback={
                                <Chakra.Box m={2} bg="inherit">
                                    <div className=" text-center">
                                        <Spinner
                                            animation="border"
                                        ></Spinner>
                                        <br />
                                        <p>Loading Description...</p>
                                    </div>
                                </Chakra.Box>
                            }
                        >
                            <Top_Chaps_Desc_Part src={this.to_use} />
                        </React.Suspense>
                    </Col>
                </Row>
                <Row className="mg-top-content">
                    <React.Suspense
                        fallback={<Chakra.Alert status="loading">
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
                        </Chakra.Alert>}
                    >
                        <CollapseHeight>
                            <Col md="4" lg="4" className="d-sm-block">
                                <React.Suspense
                                    fallback={
                                        <Chakra.Box m={2} bg="inherit">
                                            <div className=" text-center">
                                                <Spinner
                                                    animation="border"
                                                ></Spinner>
                                                <br />
                                                <p>Loading Authors ...</p>
                                            </div>
                                        </Chakra.Box>
                                    }
                                >
                                    <Author_Artists src={this.to_use} />
                                </React.Suspense>
                                <>
                                    <React.Suspense fallback={
                                        <Row>
                                        </Row>
                                    }>
                                        <Await
                                            resolve={this.to_use.get_async_genre()}
                                            errorElement={<div> </div>}
                                        >
                                            {(getted: Array<Tag>) => {
                                                return (<TagRow title="Genre" src={getted} />);
                                            }}
                                        </Await>
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
                                        >
                                            {(getted: Array<Tag>) => {
                                                return (<TagRow title="Theme" src={getted} />);
                                            }}
                                        </Await>
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
                                        >
                                            {(getted: Array<Tag>) => {
                                                return (<TagRow title="Format" src={getted} />);
                                            }}
                                        </Await>
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
                                        >
                                            {(getted: Array<Tag>) => {
                                                return (<TagRow title="Content" src={getted} />);
                                            }}
                                        </Await>
                                    </React.Suspense>
                                </>
                                <Row>
                                    <h5>Demographics</h5>
                                    <div className="d-md-inline">
                                        <Button
                                            style={{
                                                fontWeight: "800"
                                            }}
                                            className="m-1" variant="dark" size="sm">{make_first_UpperCare(this.to_use.get_demographic()!)}</Button>
                                    </div>
                                </Row>
                                <>
                                    {
                                        links == null ? (<></>) : (<LinksRow src={links.read_or_buy()} title="Read or Buy" />)
                                    }
                                </>
                                <>
                                    {
                                        links == null ? (<></>) : (<LinksRow src={links.track()} title="Track" />)
                                    }
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
                                        >
                                            {(getted: Array<React.ReactNode>) => {
                                                return (
                                                    <>
                                                        {getted}
                                                    </>
                                                );
                                            }}
                                        </Await>
                                    </React.Suspense>
                                </Row>
                                <Row>
                                    
                                </Row>
                            </Col>
                        </CollapseHeight>
                    </React.Suspense>
                    <Col xs="12" sm="12" md="8" lg="8" className="d-sm-block">
                        <Chakra.Tabs isLazy>
                            <Chakra.TabList>
                                <Chakra.Tab>Online</Chakra.Tab>
                                <Chakra.Tab>Offline</Chakra.Tab>
                            </Chakra.TabList>
                            <Chakra.TabPanels>
                                <Online_Chapter
                                    src={this.to_use}
                                />
                                <Offline_Chapters
                                    src={this.to_use}
                                />
                            </Chakra.TabPanels>
                        </Chakra.Tabs>

                    </Col>
                </Row>
            </div>
        );
    }
}