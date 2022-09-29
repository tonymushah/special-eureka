import React, { Suspense, useState } from 'react';
import { Card, Placeholder, Carousel, OverlayTrigger } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import { Await, useAsyncError, useAsyncValue, useRouteError } from 'react-router-dom';
import { Alt_title } from '../../../api/internal/Utils';
import { Cover } from '../../../api/structures/Cover';
import { Manga } from '../../../api/structures/Manga';
import { Statistics } from '../../../api/structures/Statistics';
import { Error_cmp } from '../Error_cmp';
import { CardPlaceHolders, Caroussel_PlaceHolders } from '../Placeholders';
import { Popover1, State_box } from '../popovers/Stats_manga';

export class Manga_CarouselItems extends React.Component{
    private mangaTo_Use: Manga;
    constructor(props){
        super(props);
        this.mangaTo_Use = this.props.src;
    }
    render(): React.ReactNode {
        let title: string = "";
        if (this.mangaTo_Use.get_title().en == null) {
            title = this.mangaTo_Use.get_alt_title()[0].id
        }else{
            title = this.mangaTo_Use.get_title().en;
        }
        return (
            <Carousel.Item key={this.props.key}>
                <Suspense fallback={<img src='/commons-res/Loading.svg'/>}>
                    <Await 
                        resolve={this.mangaTo_Use.get_cover_art()}
                        errorElement={<p>can't load the images</p>}
                        children={(cover_getted : Cover) => {
                            try{
                                let coverpath: string = cover_getted.get_CoverImage();
                                return (
                                        <img
                                            className="d-block w-25"
                                            src={coverpath}
                                            alt={title}
                                        />
                                );
                            }catch(e){
                                return (<code>error :D</code>)
                            }
                        }}
                    />
                </Suspense>
                <Carousel.Caption>
                    <h4>{title}</h4>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
}

