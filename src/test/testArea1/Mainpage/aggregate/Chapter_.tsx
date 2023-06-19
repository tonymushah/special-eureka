import React from "react";
import Viewer from "react-viewer";
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Alert, Col, Row } from "react-bootstrap";

export class Chapter_{
    public render(): React.ReactNode{
        const country = "jp";
        const ch_number = 0;
        const title = "Some title";
        const group = "some group";
        const uploader = "random uploader";
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