import React, { Suspense, useState } from 'react';
import { Card, Placeholder, Carousel, OverlayTrigger } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useRouteError } from 'react-router-dom';
import { Alt_title } from '../../api/internal/Utils';
import { Cover } from '../../api/structures/Cover';
import { Manga } from '../../api/structures/Manga';
import { Statistics } from '../../api/structures/Statistics';
import { Error_cmp } from './Error_cmp';
import { CardPlaceHolders } from './Placeholders';
import { Popover1, State_box } from './popovers/Stats_manga';


export class Manga1 extends React.Component{
    private mangaTo_Use: Manga;
    constructor(props){
        super(props);
        this.mangaTo_Use = this.props.src;
        this.stats_state = true;
    }
    render(): React.ReactNode {
        let title: string = "";
        if (this.mangaTo_Use.get_title().en == null) {
            title = new Alt_title(this.mangaTo_Use.get_alt_title()).get_quicklang()!;
        }else{
            title = this.mangaTo_Use.get_title().en;
        }
        return (
                <Card className="manga-card d-inline-flex align-content-center manga-simpleBOX ">
                    <Suspense fallback={<CardPlaceHolders/>}>
                        <Await 
                            resolve={this.mangaTo_Use.get_cover_art()}
                            errorElement={<Errord/>}
                            children={(cover_getted) => {
                                let coverpath: string = cover_getted.get_CoverImage_thumbnail(256);
                                return (
                                    <Suspense fallback={
                                        <CardPlaceHolders/>
                                    }>
                                        <Card.Img variant="top" src={coverpath}/>
                                    </Suspense>
                                );
                            }}
                        />
                    </Suspense>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                    </Card.Body>
                </Card>
        );
    }
}

export class Manga2 extends React.Component{
    private mangaTo_Use: Manga;
    constructor(props){
        super(props);
        this.mangaTo_Use = this.props.src;
        this.stats_state = true;
    }
    render(): React.ReactNode {
        let title: string = "";
        if (this.mangaTo_Use.get_title().en == null) {
            title = new Alt_title(this.mangaTo_Use.get_alt_title()).get_quicklang()!;
        }else{
            title = this.mangaTo_Use.get_title().en;
        }
        return (
                <Card className="manga-card2 d-inline-flex align-content-center manga-simpleBOX ">
                    <Suspense fallback={<CardPlaceHolders/>}>
                        <Await 
                            resolve={this.mangaTo_Use.get_cover_art()}
                            errorElement={<Errord/>}
                            children={(cover_getted) => {
                                let coverpath: string = cover_getted.get_CoverImage_thumbnail(256);
                                return (
                                    <Suspense fallback={
                                        <CardPlaceHolders/>
                                    }>
                                        <Card.Img variant="top" src={coverpath}/>
                                    </Suspense>
                                );
                            }}
                        />
                    </Suspense>
                    <Card.Body>
                        <State_box promise_stats={Statistics.get_statsBy_MangaID(this.mangaTo_Use.get_id())}>
                            <Card.Title>{title}</Card.Title>
                        </State_box>
                    </Card.Body>
                </Card>
        );
    }
}
function Errord(props): React.ReactNode{
    let errors = useAsyncError();
    return (
        <Error_cmp error={JSON.stringify(errors)}/>
    )
}