import React, { useState } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../../api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../../api/structures/Manga";
import { Accordion, Tabs, Tab, Tooltip, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { Alt_title, Author_Artists, Offset_limits, Lang_and_Data, Languages, Lang, make_first_UpperCare, ContentRating, Status } from "../../../api/internal/Utils";
import { Cover } from "../../../api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../../api/structures/Author";
import { Cover_Image_ }from "./Mainpage/Image_";
import { Volume_ } from "./Mainpage/aggregate/Volume";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow, TagButton } from "./Mainpage/boutons/tag_boutons";
import { Tag } from "../../../api/structures/Tag";
import { AuthorCol } from "./Mainpage/boutons/author_boutons";
import { Top_Chaps } from "./Mainpage/Top_chap";
import { Covers_Manga } from "./Mainpage/Covers_";
import * as Chakra from '@chakra-ui/react'
import "../../css/manga/mg-p.css"
import "../../css/manga/thumbail-mg.css"


type MangaPageProps = {
    src: Manga,
    children : React.ReactNode
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
    public get_status_color(): React.ReactNode{
        switch (this.to_use.get_status()) {
            case Status.ongoing():
                return (<Button size="sm" variant="success" disabled> </Button>)
                break;
            case Status.completed():
                return (<Button size="sm" variant="info" disabled> </Button>)
                break;
            case Status.hiatus():
                return (<Button size="sm" variant="warning" disabled> </Button>)
                break;
            case Status.cancelled():
                return (<Button size="sm" variant="danger" disabled> </Button>)
                break;
            default:
                return (<></>);
                break;
        }
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
            <Chakra.Box>
                <React.Suspense
                    fallback={
                        <>
                            <Chakra.Box
                                backgroundImage={placeholder}
                                backgroundRepeat={"no-repeat"}
                                backgroundPosition={{
                                    sm: "0px -5em",
                                    md: "center -10em",
                                    lg: "center -20em",
                                    xl: "center -20em",
                                    '2xl': "center -20em",
                                }}
                                backgroundSize={"cover"}
                            >
                                <Chakra.Box
                                    backdropFilter={"auto"}
                                    backdropBlur={"10px"}
                                    bgGradient="linear(#FFF 75%)"
                                    paddingTop={"10px"}
                                >
                                    <Container>
                                        <Row>
                                            <Col xs="3">
                                                <Cover_Image_ src={placeholder}/>
                                            </Col>
                                            <Col xs="9" className="overflow-hidden">
                                                <Chakra.Box>
                                                    <Chakra.Center
                                                        display={"block"}
                                                    >
                                                        <Chakra.Spinner 
                                                            size="xl"
                                                            color='orange.500'
                                                            thickness='4px'
                                                        />
                                                    </Chakra.Center>
                                                </Chakra.Box>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Chakra.Box>
                            </Chakra.Box>
                        </>
                    }
                >
                    <Await
                        resolve={this.to_use.get_cover_art()}
                        errorElement={
                            <>
                                <Chakra.Box
                                    backgroundImage={manga_cover}
                                    backgroundRepeat={"no-repeat"}
                                    backgroundPosition={{
                                        sm: "0px -5em",
                                        md: "center -10em",
                                        lg: "center -20em",
                                        xl: "center -20em",
                                        '2xl': "center -20em",
                                    }}
                                    backgroundSize={"cover"}
                                >
                                    <Chakra.Box
                                        backdropFilter={"auto"}
                                        backdropBlur={"10px"}
                                        bgGradient="linear(#FFF 75%)"
                                        paddingTop={"10px"}
                                    >
                                        <Container>
                                            <Row>
                                                <Col xs="3">
                                                    <Cover_Image_ src={manga_cover}/>
                                                </Col>
                                                <Col xs="9" className="overflow-hidden">
                                                    <Chakra.Heading
                                                        size={{
                                                            base: "lg",
                                                            sm: "xl",
                                                            md: "2xl",
                                                            xl: "3xl"
                                                        }}
                                                        noOfLines={1}
                                                        marginBottom={{
                                                            md : "1vh",
                                                            lg : "1em"
                                                        }}
                                                    >
                                                        {title}
                                                    </Chakra.Heading>
                                                    <Chakra.Heading
                                                        size={{
                                                            base: "sm",
                                                            md: "lg"
                                                        }}
                                                        noOfLines={1}    
                                                        marginBottom={{
                                                            md : "1em"
                                                        }}
                                                    >
                                                        <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                                            <Await
                                                                resolve={Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title())}
                                                                errorElement={<div></div>}
                                                                children={(getted: Array<Lang_and_Data>) => {
                                                                    if(Lang_and_Data.find_data_by_lang2l("en", getted) instanceof Lang_and_Data){
                                                                        return (
                                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{Lang_and_Data.find_data_by_lang2l("en", getted)!.get_data()}</Chakra.Heading>
                                                                        );
                                                                    }else{
                                                                        return (
                                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{getted[Math.floor(Math.random() * getted.length)].get_data()}</Chakra.Heading>
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            
                                                        </React.Suspense>
                                                    </Chakra.Heading>
                                                    <Chakra.Box
                                                        backgroundColor={"white"}
                                                        height={"full"}
                                                        borderTopRadius={"10px"}
                                                        boxShadow={"md"}
                                                    >
                                                        <Chakra.Box
                                                            marginLeft={"20px"}
                                                            marginTop={"1vh"}
                                                        >
                                                            <Chakra.Heading
                                                                paddingTop={"10px"}
                                                                size={{
                                                                    base: "xs",
                                                                    lg: "md"
                                                                }}
                                                            >
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
                                                                </Chakra.Heading>
                                                            </Chakra.Box>
                                                            <Row className=" mdP-top-themes mb-1">
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
                                                                <Chakra.Heading size="md">Publication : {this.get_status_color()} {make_first_UpperCare(this.to_use.get_status())}</Chakra.Heading>
                                                            </Row>
                                                    </Chakra.Box>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Chakra.Box>
                                </Chakra.Box>
                            </>
                        }
                    >
                        {
                            (getted: Cover) => {
                                return (
                                    <>
                                        <Chakra.Box
                                            backgroundImage={getted.get_CoverImage()}
                                            backgroundRepeat={"no-repeat"}
                                            backgroundPosition={{
                                                sm: "0px -5em",
                                                md: "center -10em",
                                                lg: "center -20em",
                                                xl: "center -20em",
                                                '2xl': "center -20em",
                                            }}
                                            backgroundSize={"cover"}
                                        >
                                            <Chakra.Box
                                                backdropFilter={"auto"}
                                                backdropBlur={"10px"}
                                                bgGradient="linear(#FFF 75%)"
                                                paddingTop={"10px"}
                                            >
                                                <Container>
                                                    <Row>
                                                        <Col xs="3">
                                                            <Cover_Image_ src={getted.get_CoverImage()}/>
                                                        </Col>
                                                        <Col xs="9" className="overflow-hidden">
                                                            <Chakra.Heading
                                                                size={{
                                                                    base: "lg",
                                                                    sm: "xl",
                                                                    md: "2xl",
                                                                    xl: "3xl"
                                                                }}
                                                                noOfLines={1}
                                                                marginBottom={{
                                                                    md : "1vh",
                                                                    lg : "1em"
                                                                }}
                                                            >
                                                                {title}
                                                            </Chakra.Heading>
                                                            <Chakra.Heading
                                                                size={{
                                                                    base: "sm",
                                                                    md: "lg"
                                                                }}
                                                                noOfLines={1}    
                                                                marginBottom={{
                                                                    md : "1em"
                                                                }}
                                                            >
                                                                <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                                                    <Await
                                                                        resolve={Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title())}
                                                                        errorElement={<div></div>}
                                                                        children={(getted: Array<Lang_and_Data>) => {
                                                                            if(Lang_and_Data.find_data_by_lang2l("en", getted) instanceof Lang_and_Data){
                                                                                return (
                                                                                    <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{Lang_and_Data.find_data_by_lang2l("en", getted)!.get_data()}</Chakra.Heading>
                                                                                );
                                                                            }else{
                                                                                return (
                                                                                    <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{getted[Math.floor(Math.random() * getted.length)].get_data()}</Chakra.Heading>
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    
                                                                </React.Suspense>
                                                            </Chakra.Heading>
                                                            <Chakra.Box
                                                                backgroundColor={"white"}
                                                                height={"full"}
                                                                borderTopRadius={"10px"}
                                                                boxShadow={"md"}
                                                            >
                                                                <Chakra.Box
                                                                    marginLeft={"20px"}
                                                                    marginTop={"1vh"}
                                                                >
                                                                    <Chakra.Heading
                                                                        paddingTop={"10px"}
                                                                        size={{
                                                                            base: "xs",
                                                                            lg: "md"
                                                                        }}
                                                                    >
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
                                                                        </Chakra.Heading>
                                                                    </Chakra.Box>
                                                                    <Row className=" mdP-top-themes mb-1">
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
                                                                        <Chakra.Heading size="md">Publication : {this.get_status_color()} {make_first_UpperCare(this.to_use.get_status())}</Chakra.Heading>
                                                                    </Row>
                                                            </Chakra.Box>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Chakra.Box>
                                        </Chakra.Box>
                                    </>
                                );
                            }
                        }
                    </Await>
                </React.Suspense>
                <Chakra.Box>
                    {this.props.children}
                </Chakra.Box>
            </Chakra.Box>
        );
    }
}

// old 
/*
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
                                        <Chakra.Heading fontFamily="Poppins" size="2xl" fontWeight="bolder" className="title-bended">{title}</Chakra.Heading>
                                    </Row>
                                    <Row className="mb-lg-5 mb-sm-1">
                                        <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                            <Await
                                                resolve={Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title())}
                                                errorElement={<div></div>}
                                                children={(getted: Array<Lang_and_Data>) => {
                                                    if(Lang_and_Data.find_data_by_lang2l("en", getted) instanceof Lang_and_Data){
                                                        return (
                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{Lang_and_Data.find_data_by_lang2l("en", getted)!.get_data()}</Chakra.Heading>
                                                        );
                                                    }else{
                                                        return (
                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{getted[Math.floor(Math.random() * getted.length)].get_data()}</Chakra.Heading>
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
                                    <Row className=" mdP-top-themes mb-1">
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
                                        <h6>Publication : {this.get_status_color()} {make_first_UpperCare(this.to_use.get_status())}</h6>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                </div>
            </Row>
            <Row>
                {this.props.children}
            </Row>
        </Container>
*/