import React, { ReactEventHandler, ReactNode, Suspense, useState } from 'react';
import { Carousel, Container, Row, Spinner } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useRouteError } from 'react-router-dom';
import { Cover } from '../../../api/structures/Cover';
import { Manga } from '../../../api/structures/Manga';
import { Error_cmp } from '../Error_cmp';
import { Manga_CarouselItems } from './Manga2';

export class MangaCarrousel extends React.Component{
    private mangasTo_Use: Array<Manga>;
    constructor(props){
        super(props);
        this.mangasTo_Use = this.props.src;
    }
    async generate_carouselItem(): Promise<Array<React.ReactNode>>{
        let dists: Array<React.ReactNode> = new Array<React.ReactNode>(this.mangasTo_Use.length);
        for (let index = 0; index < this.mangasTo_Use.length; index++) {
            const element = this.mangasTo_Use[index];
            let title: string = "";
            if (element.get_title().en == null) {
                title = element.get_alt_title()[0].id
            }else{
                title = element.get_title().en;
            }
            let cover_path: string = (await element.get_cover_art()).get_CoverImage_thumbnail(256);
            dists[index] = (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={cover_path}
                        alt={title}
                    />
                    <Carousel.Caption>
                        <h4>{title}</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
        return dists;
    }
    render(): React.ReactNode {
        return (
                <React.Suspense fallback={
                    <Container>
                        <Row>
                            <div className="d-block align-content-center">
                                <Spinner size='lg' animation='border'></Spinner>
                                <br/>
                                <h4>Executing Scripts</h4>
                            </div>
                        </Row>
                    </Container>
                }>

                    <Await
                        resolve={this.generate_carouselItem()}
                        errorElement={<Errord/>}
                        children={(getted) => {
                                return (
                                    <Carousel className='d-flex h-100'>
                                        {getted}
                                    </Carousel>
                                )
                            }
                        }
                    />
                </React.Suspense>
        )
    }
}