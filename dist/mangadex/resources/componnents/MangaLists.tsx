import React, { ReactEventHandler, ReactNode, Suspense, useState } from 'react';
import { Carousel, Container, Row, Spinner } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useRouteError } from 'react-router-dom';
import { Cover } from '../../api/structures/Cover';
import { Manga } from '../../api/structures/Manga';
import { Error_cmp } from './Error_cmp';
import { Manga1, Manga2, Manga_CarouselItems } from './Manga1';

function Errord(props): React.ReactNode{
    let errors = useAsyncError();
    return (
        <Error_cmp error={JSON.stringify(errors)}/>
    )
}

export class Cards_list extends React.Component{
    private mangasTo_Use: Array<Manga>;
    constructor(props){
        super(props);
        this.mangasTo_Use = this.props.src;
    }
    async loadCards(): Promise<Array<React.ReactNode>>{
        let dists: Array<React.ReactNode> = new Array<React.ReactNode>(this.mangasTo_Use.length);
        for (let index = 0; index < this.mangasTo_Use.length; index++) {
            const element = this.mangasTo_Use[index];
            dists[index] = (<Manga1 src={element}/>);
        }
        return dists;
    }
    render(): React.ReactNode {
        return (
                <React.Suspense fallback={
                    <Container>
                        <Row>
                            <div className="d-block align-center">
                                <Spinner size='lg' animation='border'></Spinner>
                                <br/>
                                <h4>Executing Scripts</h4>
                            </div>
                        </Row>
                    </Container>
                }>

                    <Await
                        resolve={this.loadCards()}
                        errorElement={<Errord/>}
                        children={(getted) => {
                                return (
                                    <div className=' d-xl-inline-block'>
                                        {getted}
                                    </div>
                                )
                            }
                        }
                    />
                </React.Suspense>
        )
    }
}
export class Cards_list2 extends React.Component{
    private mangasTo_Use: Array<Manga>;
    constructor(props){
        super(props);
        this.mangasTo_Use = this.props.src;
    }
    async loadCards(): Promise<Array<React.ReactNode>>{
        let dists: Array<React.ReactNode> = new Array<React.ReactNode>(this.mangasTo_Use.length);
        for (let index = 0; index < this.mangasTo_Use.length; index++) {
            const element = this.mangasTo_Use[index];
            dists[index] = (<Manga2 src={element}/>);
        }
        return dists;
    }
    render(): React.ReactNode {
        return (
                <React.Suspense fallback={
                    <Container>
                        <Row>
                            <div className="d-block align-center">
                                <Spinner size='lg' animation='border'></Spinner>
                                <br/>
                                <h4>Executing Scripts</h4>
                            </div>
                        </Row>
                    </Container>
                }>

                    <Await
                        resolve={this.loadCards()}
                        errorElement={<Errord/>}
                        children={(getted) => {
                                return (
                                    <div className=' d-xl-inline-block'>
                                        {getted}
                                    </div>
                                )
                            }
                        }
                    />
                </React.Suspense>
        )
    }
}