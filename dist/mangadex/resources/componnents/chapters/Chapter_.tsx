import React, { Suspense } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Alert, Col, Container, Placeholder, Row } from "react-bootstrap";
import { Chapter } from "../../../api/structures/Chapter";
import ReactTimeAgo from 'react-time-ago'
import { Await } from "react-router-dom";

export class Chapter_ extends React.Component{
    private chapter_to_use: Chapter;
    public constructor(props){
        super(props);
        this.chapter_to_use = this.props.chapter;
    }
    public render(): React.ReactNode{
        return (
            <Container {...this.props}>
                <Alert variant="secondary" className="bg-local p-1">
                    <Row>
                        <Col xs={7} sm={8} md={9} lg={10} xl={10}>
                            <Row>
                                <span>Ch.{this.chapter_to_use.get_chapter()} {this.chapter_to_use.get_title()}</span>
                            </Row>
                            <Row>
                                <i className=" fas fa-group"> </i>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <Await
                                        resolve={this.chapter_to_use.get_groupUploaders()}
                                        errorElement={<span>Errors loading groups...</span>}
                                        children={(getted) =>{
                                            if(getted.length == 0){
                                                return (<span className="font-italic">No group</span>);
                                            }else if(getted.length == 1){
                                                return (<span>{getted[0].get_name()}</span>);
                                            }else{
                                                var span_group: Array<React.ReactNode> = new Array<React.ReactNode>(getted.length);
                                                for (let index = 0; index < getted.length; index++) {
                                                    const element = getted[index];
                                                    if(index < (getted.length - 1)){
                                                        span_group[index] = (<span>{element.get_name()} | </span>);
                                                    }else{
                                                        span_group[index] = (<span>{element.get_name()}</span>);
                                                    }
                                                }
                                                return (<>{span_group}</>);
                                            }
                                        }}
                                    />
                                </Suspense>
                            </Row>
                        </Col>
                        <Col xs={5} sm={4} md={3} lg={2} xl={2}>
                            <Row>
                                <ReactTimeAgo date={new Date(this.chapter_to_use.get_publishAt())}/>
                            </Row>
                            <Row>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <Await
                                        resolve={this.chapter_to_use.get_userUploader()}
                                        errorElement={<p>Errors loading user...</p>}
                                        children={(getted) =>{
                                            return (<span>{getted.get_username()}</span>)
                                        }}
                                    />
                                </Suspense>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
            </Container>
        );
    }
}