import React from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Alert, Col, Row } from "react-bootstrap";

export class Chapter_{
    public render(): React.ReactNode{
        var country: string = "jp";
        var ch_number: number = 0;
        var title: string = "Some title";
        var group: string = "some group";
        var uploader: string = "random uploader";
        return (
            <Row>
                <Alert variant="secondary">
                    <Row>
                        <Col xs="4" sm="4" md="6" lg="6">
                            <span className={"fi " + "fi-" + country}> </span>
                            <span>Chapter {ch_number} - {title}</span>
                        </Col>
                        <Col xs="4" sm="4" md="3" lg="3">
                            <p>{group}</p>
                        </Col>
                        <Col xs="4" sm="4" md="3" lg="3">
                            <p>{uploader}</p>
                        </Col>
                    </Row>
                </Alert>
            </Row>
        );
    }
}