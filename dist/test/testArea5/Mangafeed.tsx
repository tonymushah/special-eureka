import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { Cover_Image_ } from "../testArea1/Image_";
import { Chapter_ } from "./Chapter_";

export class Mangafeed extends React.Component{
    constructor(props){
        super(props);
    }
    render(): React.ReactNode {
        let manga_cover: string = "./imgs/cover_image1.jpg";
        return (
            <Container>
                <Row>
                    <Col xs="4" sm="3" md="3" lg="3" xl="2">
                        <Cover_Image_ id="top-cover" state={false} src={manga_cover}/>
                    </Col>
                        <Col xs="8" sm="9" md="9" lg="9" xl="10">
                        <Container>
                            <Row className="mb-xs-1 mb-lg-5 mb-sm-1">
                                <h3 >{"Manga Title dfhdsfouhdfsuodfhuidsfgidsfsgdf"}</h3>
                            </Row>
                            <Row className="mb-lg-5 mb-sm-1">
                                <Chapter_/>
                                <Chapter_/>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}