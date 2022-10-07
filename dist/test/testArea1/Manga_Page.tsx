import React, { useState } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Accordion, Tabs, Tab, Tooltip, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { Alt_title, Author_Artists, Offset_limits, Lang_and_Data, Languages, Lang, make_first_UpperCare, ContentRating } from "../../mangadex/api/internal/Utils";
import { Cover } from "../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../mangadex/api/structures/Author";
import { Cover_Image_ }from "./Mainpage/Image_";
import { Volume_ } from "./Volume";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow, TagButton } from "./Mainpage/boutons/tag_boutons";
import { Tag } from "../../mangadex/api/structures/Tag";
import { AuthorCol } from "./Mainpage/boutons/author_boutons";
import { Top_Chaps } from "./Mainpage/Top_chap";
import { Covers_Manga } from "./Mainpage/Covers_";


type MangaPageProps = {
    src: Manga
}
export class Manga_Page extends React.Component<MangaPageProps>{
    private to_use: Manga;
    private key: string;
    //private _cover: Cover;
    public constructor(props : MangaPageProps){
        super(props);
        this.to_use = this.props.src;
        this.key = "chapters";
    }
    public set_key(key: string){
        this.key = key;
    }
    public async authors_artists(): Promise<Array<React.ReactNode>>{
        let returns: Author_Artists = new Author_Artists(await this.to_use.get_author(), await this.to_use.get_artist());
        let returns2 : Array<React.ReactNode> = new Array<React.ReactNode>(returns.filtred.length);
        for (let index = 0; index < returns.filtred.length; index++) {
            const element = returns.filtred[index];
            if(index == (returns.filtred.length - 1)){
                returns2[index] = (
                    <span>{element.get_Name()}</span>
                )
            }else{
                returns2[index] = (
                    <span>{element.get_Name()},</span>
                )
            }
        }
        return returns2;
    }
    public async build_themes_manga(): Promise<Array<React.ReactNode>>{
        let index = 0;
        let returns : Array<React.ReactNode> = [];
        if(this.to_use.get_ranting() != ContentRating.safe()){
            if(this.to_use.get_ranting() == ContentRating.suggestive()){
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="success" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            }else{
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < this.to_use.get_tags().length; index1++) {
            const element = this.to_use.get_tags()[index1];
            returns[index + index1] = (<Button className="mgP-top-theme d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>)
        }
        return returns;
    }
    public render(): React.ReactNode{
        
        let manga_cover: string = "/mangadex/resources/imgs/cover-not-found.jpg";
        let placeholder: string = "/mangadex/resources/imgs/cover-placeholder.png";
        //let manga_cover: string = "..";
        let title: string = "";
        //let desc: string = "";
        if (this.to_use.get_title().en == null) {
            title = new Alt_title(this.to_use.get_alt_title()).get_quicklang()!;
        }else{
            title = this.to_use.get_title().en;
        }
        return (
            <Container>
                <Row className=" overflow-hidden h-50 " id="mg-pHeader"  >
                    <React.Suspense fallback={
                        <div id="mg-container-cover">
                            <img src={placeholder} className=" placeholder-active" id="cover-big"/>
                        </div>
                    }>
                        <Await
                            resolve={this.to_use.get_cover_art()}
                            errorElement={
                                <div id="mg-container-cover">
                                    <img src={manga_cover} id="cover-big"/>
                                </div>
                            }
                            children={(getted: Cover) => {
                                return (
                                    <div id="mg-container-cover">
                                        <img src={getted.get_CoverImage()} id="cover-big"/>
                                    </div>
                                )
                            }}
                        />
                    </React.Suspense>
                    <div id="mg-container-content">
                        <Row className="top-100">
                            <Col xs="5" sm="4" md="3" lg="3" xl="3">
                                <React.Suspense fallback={
                                    <Cover_Image_ id="top-cover" state={false} src={placeholder}/>
                                }>
                                    <Await
                                        resolve={this.to_use.get_cover_art()}
                                        errorElement={
                                            <div id="mg-container-cover">
                                                <img src={manga_cover} id="cover-big"/>
                                            </div>
                                        }
                                        children={(getted: Cover) => {
                                            return (
                                                <Cover_Image_ id="top-cover" state={false} src={getted.get_CoverImage()}/>
                                            )
                                        }}
                                    />
                                </React.Suspense>
                            </Col>
                            <Col xs="7" sm="8" md="9" lg="9" xl="9">
                                <Container>
                                    <Row className="mb-xs-1 mb-md-3 mb-lg-5 mb-sm-1">
                                        <h1 style={{"fontWeight": "bolder"}} className="title-bended">{title}</h1>
                                    </Row>
                                    <Row className="mb-lg-5 mb-sm-1">
                                        <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                            <Await
                                                resolve={Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title())}
                                                errorElement={<div></div>}
                                                children={(getted: Array<Lang_and_Data>) => {
                                                    if(Lang_and_Data.find_data_by_lang2l("en", getted) instanceof Lang_and_Data){
                                                        return (
                                                            <h5 className="title-bended">{Lang_and_Data.find_data_by_lang2l("en", getted)!.get_data()}</h5>
                                                        );
                                                    }else{
                                                        return (
                                                            <h2 className="title-bended">{getted[Math.floor(Math.random() * getted.length)].get_data()}</h2>
                                                        );
                                                    }
                                                }}
                                            />
                                            
                                        </React.Suspense>
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
                                    <Row className="mt-1">
                                        <h5>
                                            <React.Suspense fallback={
                                                <Placeholder xs={5}></Placeholder>
                                            }>
                                                <Await
                                                    resolve={this.authors_artists()}
                                                    errorElement={<span></span>}
                                                    children={(getted : Array<React.ReactNode>) => {
                                                        return (
                                                            <>
                                                                {getted}
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </React.Suspense>
                                        </h5>
                                    </Row>
                                    <Row className=" overflow-x-scroll mb-1">
                                        <React.Suspense fallback={<Placeholder xs={4}></Placeholder>}>
                                            <Await
                                                resolve={this.build_themes_manga()}
                                                errorElement={<span> </span>}
                                                children={(getted: Array<React.ReactNode>) => {
                                                    return (<Col>{getted}</Col>);
                                                }}
                                            />
                                        </React.Suspense>
                                    </Row>
                                    <Row>
                                        <span> State </span>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                </div>
            </Row>
            <Tabs
                key={this.key}
                onSelect={(k) => this.set_key(k!)}
                className=" mgP-tabs"
            >
                <Tab
                    title="Chapters"
                    eventKey={"chapters"}
                >
                    <Top_Chaps src={this.to_use}/>
                </Tab>
                <Tab
                    title="Covers"
                    eventKey={"covers"}
                >
                    <Covers_Manga src={this.to_use}/>
                </Tab>
                <Tab
                    title="Related"
                    eventKey={"related"}
                >
                    
                </Tab>
            </Tabs>
        </Container>
        );
    }
}
/*
*/