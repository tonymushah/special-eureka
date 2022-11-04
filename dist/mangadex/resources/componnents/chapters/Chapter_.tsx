import React, { Suspense } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Alert, Col, Container, Placeholder, Row } from "react-bootstrap";
import { Chapter, Chapter_withAllIncludes } from "../../../api/structures/Chapter";
import { Await } from "react-router-dom";
import TimeAgo from 'react-timeago'
import * as Chakra from '@chakra-ui/react'
type Chapter_Props = {
    chapter: Chapter;
}

export class Chapter_ extends React.Component<Chapter_Props>{
    private chapter_to_use: Chapter;
    public constructor(props: Chapter_Props){
        super(props);
        this.chapter_to_use = this.props.chapter;
    }
    public async get_chapter() : Promise<React.ReactNode>{
        try{
            return (
                <span>Ch.{this.chapter_to_use.get_chapter()}</span>
            );
        }catch(e){
            throw e;
        }
    }
    public async get_title() : Promise<React.ReactNode>{
        try{
            return (
                <span>{this.chapter_to_use.get_title()}</span>
            );
        }catch(e){
            throw e;
        }
    }
    public render(): React.ReactNode{
        return (
            <Container {...this.props}>
                <Alert variant='secondary' className=" p-1">
                    <Row>
                        <Col xs={7} sm={8} md={9} lg={10} xl={10}>
                            <Row>
                                <span>
                                    <React.Suspense
                                        fallback={
                                            <Chakra.SkeletonText></Chakra.SkeletonText>
                                        }
                                    >
                                        <Await
                                            resolve={this.get_chapter()}
                                        >
                                            {(getted : React.ReactNode) => {
                                                return (<Chakra.Text display={"inline"}>{getted}</Chakra.Text>);
                                            }}
                                        </Await>
                                    </React.Suspense>
                                    &nbsp;
                                    <React.Suspense
                                        fallback={
                                            <Chakra.SkeletonText></Chakra.SkeletonText>
                                        }
                                    >
                                        <Await
                                            resolve={this.get_title()}
                                        >
                                            {(getted : React.ReactNode) => {
                                                return (<Chakra.Text display={"inline"}>{getted}</Chakra.Text>);
                                            }}
                                        </Await>
                                    </React.Suspense>
                                </span>
                            </Row>
                            <Row>
                                <span>
                                    <i className=" fas fa-group d-flex"> </i>
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
                                                    return (<span>{span_group}</span>);
                                                }
                                            }}
                                        />
                                    </Suspense>
                                </span>
                            </Row>
                        </Col>
                        <Col xs={5} sm={4} md={3} lg={2} xl={2}>
                            <Row>
                                <TimeAgo date={new Date(this.chapter_to_use.get_publishAt())}/>
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
export class Chapter_2 extends React.Component<Chapter_Props>{
    private chapter_to_use: Chapter;
    public constructor(props: Chapter_Props){
        super(props);
        this.chapter_to_use = this.props.chapter;
    }
    public async get_chapter() : Promise<React.ReactNode>{
        try{
            return (
                <span>Ch.{this.chapter_to_use.get_chapter()}</span>
            );
        }catch(e){
            throw e;
        }
    }
    public async get_title() : Promise<React.ReactNode>{
        try{
            return (
                <span>{this.chapter_to_use.get_title()}</span>
            );
        }catch(e){
            throw e;
        }
    }
    public render(): React.ReactNode{
        return (
            <Container {...this.props}>
                <Alert variant='secondary' className=" p-1">
                    <Row>
                        <Col xs={7}>
                            <Row>
                                <span>
                                    <React.Suspense
                                        fallback={
                                            <Chakra.SkeletonText></Chakra.SkeletonText>
                                        }
                                    >
                                        <Await
                                            resolve={this.get_chapter()}
                                        >
                                            {(getted : React.ReactNode) => {
                                                return (<Chakra.Text display={"inline"}>{getted}</Chakra.Text>);
                                            }}
                                        </Await>
                                    </React.Suspense>
                                    &nbsp;
                                    <React.Suspense
                                        fallback={
                                            <Chakra.SkeletonText></Chakra.SkeletonText>
                                        }
                                    >
                                        <Await
                                            resolve={this.get_title()}
                                        >
                                            {(getted : React.ReactNode) => {
                                                return (<Chakra.Text display={"inline"}>{getted}</Chakra.Text>);
                                            }}
                                        </Await>
                                    </React.Suspense>
                                </span>
                            </Row>
                            <Row>
                                <span>
                                    <i className=" fas fa-group d-flex"> </i>
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
                                                    return (<span>{span_group}</span>);
                                                }
                                            }}
                                        />
                                    </Suspense>
                                </span>
                            </Row>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <TimeAgo date={new Date(this.chapter_to_use.get_publishAt())}/>
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


type Chapter_includes_Props = {
    chapter: Chapter_withAllIncludes;
}

export class Chapter_includes extends React.Component<Chapter_includes_Props>{
    private chapter_to_use: Chapter_withAllIncludes;
    public constructor(props: Chapter_includes_Props){
        super(props);
        this.chapter_to_use = this.props.chapter;
    }
    initialize_groups(): React.ReactNode{
        if(this.chapter_to_use.get_groups().length == 0){
            return (<span className="font-italic">No group</span>);
        }else if(this.chapter_to_use.get_groups().length == 1){
            return (<span>{this.chapter_to_use.get_groups()[0].get_name()}</span>);
        }else{
            var span_group: Array<React.ReactNode> = new Array<React.ReactNode>(this.chapter_to_use.get_groups().length);
            for (let index = 0; index < this.chapter_to_use.get_groups().length; index++) {
                const element = this.chapter_to_use.get_groups()[index];
                if(index < (this.chapter_to_use.get_groups().length - 1)){
                    span_group[index] = (<span>{element.get_name()} | </span>);
                }else{
                    span_group[index] = (<span>{element.get_name()}</span>);
                }
            }
            return (<span>{span_group}</span>)
        }
    }
    public render(): React.ReactNode{
        
        return (
            <Container {...this.props}>
                <Alert variant="secondary" className="bg-local p-1">
                    <Row>
                        <Col xs={7} sm={8} md={8} lg={9} xl={9}>
                            <Row>
                                <span>Ch.{this.chapter_to_use.get_chapter()} {this.chapter_to_use.get_title()}</span>
                            </Row>
                            <Row>
                                <Col className="">
                                    <span className=" d-inline-flex">
                                        <i className=" fas fa-group"> </i>
                                        <span>&nbsp;</span>
                                        <Suspense fallback={<Placeholder xs={4}/>}>
                                            {this.initialize_groups()}
                                        </Suspense>
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={5} sm={4} md={4} lg={3} xl={3}>
                            <Row>
                                <TimeAgo date={new Date(this.chapter_to_use.get_publishAt())}/>
                            </Row>
                            <Row>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <span>{
                                        this.chapter_to_use.get_uploader().get_username()
                                    }</span>
                                </Suspense>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
            </Container>
        );
    }
}
export class Chapter_includes2 extends React.Component<Chapter_includes_Props>{
    private chapter_to_use: Chapter_withAllIncludes;
    public constructor(props: Chapter_includes_Props){
        super(props);
        this.chapter_to_use = this.props.chapter;
    }
    initialize_groups(): React.ReactNode{
        if(this.chapter_to_use.get_groups().length == 0){
            return (<span className="font-italic">No group</span>);
        }else if(this.chapter_to_use.get_groups().length == 1){
            return (<span>{this.chapter_to_use.get_groups()[0].get_name()}</span>);
        }else{
            var span_group: Array<React.ReactNode> = new Array<React.ReactNode>(this.chapter_to_use.get_groups().length);
            for (let index = 0; index < this.chapter_to_use.get_groups().length; index++) {
                const element = this.chapter_to_use.get_groups()[index];
                if(index < (this.chapter_to_use.get_groups().length - 1)){
                    span_group[index] = (<span>{element.get_name()} | </span>);
                }else{
                    span_group[index] = (<span>{element.get_name()}</span>);
                }
            }
            return (<span>{span_group}</span>)
        }
    }
    public render(): React.ReactNode{
        
        return (
            <Container {...this.props}>
                <Alert variant="secondary" className="bg-local p-1">
                    <Row>
                        <Col xs={7}>
                            <Row>
                                <span>Ch.{this.chapter_to_use.get_chapter()} {this.chapter_to_use.get_title()}</span>
                            </Row>
                            <Row>
                                <Col className="">
                                    <span className=" d-inline-flex">
                                        <i className=" fas fa-group"> </i>
                                        <span>&nbsp;</span>
                                        <Suspense fallback={<Placeholder xs={4}/>}>
                                            {this.initialize_groups()}
                                        </Suspense>
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <TimeAgo date={new Date(this.chapter_to_use.get_publishAt())}/>
                            </Row>
                            <Row>
                                <Suspense fallback={<Placeholder xs={4}/>}>
                                    <span>{
                                        this.chapter_to_use.get_uploader().get_username()
                                    }</span>
                                </Suspense>
                            </Row>
                        </Col>
                    </Row>
                </Alert>
            </Container>
        );
    }
}