import React, { Suspense } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Alert, Col, Container, Placeholder, Row } from "react-bootstrap";
//import { Chapter } from "../../../api/structures/Chapter";
import ReactTimeAgo from 'react-time-ago'
import { Await } from "react-router-dom";

export class Chapter_ extends React.Component{
    //private chapter_to_use: Chapter;
    public constructor(props){
        super(props);
        //this.chapter_to_use = this.props.chapter;
    }
    public render(): React.ReactNode{
        return (
            <Container>
                <Alert variant="secondary" className="bg-local p-1">
                    <Row>
                        <Col xs={7} sm={8} md={9} lg={10} xl={10}>
                            <Row>
                                <span>Ch.{4} {"Chapter-title"}</span>
                            </Row>
                            <Row>
                                <i className=" fas fa-group"> </i>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <span>some group</span>
                                </Suspense>
                            </Row>
                        </Col>
                        <Col xs={5} sm={4} md={3} lg={2} xl={2}>
                            <Row>
                                <ReactTimeAgo date={new Date()}/>
                            </Row>
                            <Row>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <span>Uploader</span>
                                </Suspense>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
            </Container>
        );
    }
}