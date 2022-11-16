import React, { useState } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../../../api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../../../api/structures/Manga";
import { Accordion, Tabs, Tab,Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { Alt_title, Author_Artists, Offset_limits, Lang_and_Data, Languages, Lang, make_first_UpperCare } from "../../../../api/internal/Utils";
import { Cover } from "../../../../api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../../../api/structures/Author";
import { Cover_Image_, Cover_Image_2 }from "../Mainpage/Image_";
import * as Chakra from "@chakra-ui/react";
import { Volume_ } from "./aggregate/Volume";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow, TagButton } from "../Mainpage/boutons/tag_boutons";
import { Tag } from "../../../../api/structures/Tag";
import { AuthorCol } from "./boutons/author_boutons";
type MangaPageProps = {
    src: Manga
}
export class Covers_Manga extends React.Component<MangaPageProps>{
    private to_use: Manga;
    //private _cover: Cover;
    public constructor(props : MangaPageProps){
        super(props);
        this.to_use = this.props.src;
    }
    public async build_covers(): Promise<Array<React.ReactNode>>{
        var covers : Array<Cover> = await this.to_use.get_allCover();
        let returns: Array<React.ReactNode> = new Array<React.ReactNode>(covers.length);
        for (let index = 0; index < covers.length; index++) {
            const element = covers[index];
            returns[index] = (
                <Chakra.WrapItem>
                    <Cover_Image_2 className="mgP-covers" src={element}/>
                </Chakra.WrapItem>
            );
        }
        return returns;
    }
    render(): React.ReactNode {
        return (
        <Chakra.Center>
            <Row className="mg-top-content">
                <React.Suspense
                    fallback={
                        <p className=" align-content-center">
                            <Spinner animation="border"></Spinner>
                            <br/>
                            <span>Loading covers...</span>
                        </p>
                    }
                >
                    <Await
                        resolve={this.build_covers()}
                        errorElement={<span>seems like this manga has no covers</span>}
                        children={(getted: Array<React.ReactNode>) => {
                            return (
                            
                                <Chakra.Wrap spacing="30px">
                                    {getted}
                                </Chakra.Wrap>

                            );
                        }}
                    />
                </React.Suspense>
            </Row>
        </Chakra.Center>);
    }
}