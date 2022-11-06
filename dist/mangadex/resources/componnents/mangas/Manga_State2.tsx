import React, { Suspense, useCallback } from "react"
import { Card, CardImg, Carousel, Row, Spinner } from "react-bootstrap";
import ReactDOM from 'react-dom/client';
import { Await } from "react-router-dom";
import { Cover } from "../../../api/structures/Cover";
import { Alt_title, Lang_and_Data } from '../../../api/internal/Utils';
import { Manga, Manga_2 } from "../../../api/structures/Manga";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from "swiper";
import { ErrorELAsync } from "../Error_cmp";
import 'swiper/css';
import { Link } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css"
import "../../css/manga/slider-manga.css"
type Manga3Props = {
    toUse : Manga
}

export class Manga4 extends React.Component<Manga3Props>{
    private to_use : Manga;
    constructor(props: Manga3Props){
        super(props);
        this.to_use = this.props.toUse;
    }
    render(): React.ReactNode {
        let title: string = "";
        if (this.to_use.get_title().en == null) {
            title = new Alt_title(this.to_use.get_alt_title()).get_quicklang()!;
        }else{
            title = this.to_use.get_title().en;
        }
        return (
            <Chakra.Box
                width={"160px"}
            >
                <Card>
                    <Card.Body>
                        <React.Suspense fallback={<Card.Img src="" className="manga-item3-img"/>}>
                            <Await
                                resolve={this.to_use.get_cover_art()}
                                errorElement={<p>Error while loading cover</p>}
                                children={(getted: Cover) => {
                                    let coverpath: string = getted.get_CoverImage_thumbnail(256);
                                    return (
                                        <React.Suspense>
                                            <Card.Img src={coverpath} width={"150px"}/>
                                        </React.Suspense>
                                    )
                                }}
                            />
                        </React.Suspense>
                        <Chakra.Box 
                            display={"block"}
                            overflow={"hidden"}
                        >
                            <Card.Title className="text-center">
                                <Chakra.Text
                                    noOfLines={1}
                                >
                                    <Link to={"/mangadex/manga/" + this.to_use.get_id()}>
                                        {title}
                                    </Link>
                                </Chakra.Text>
                            </Card.Title>
                        </Chakra.Box>
                    </Card.Body>
                </Card>
            </Chakra.Box>
        );
    }
}
export class Manga3TEST extends React.Component{
    render(): React.ReactNode {
        return (
            <Card className="manga-item3">
                <Card.Body>
                    <Card.Img src="./imgs/cover_image1.jpg" className="manga-item3-img"/>
                    <div className="manga-item3-content overflow-hidden">
                        <Card.Title className="text-center text-lg-start">MangaTitle</Card.Title>
                        <Card.Subtitle className=" d-none d-lg-flex"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eaque, distinctio quaerat laudantium, rem suscipit error perferendis similique deleniti natus ut. Illo veniam nobis recusandae, sed perferendis in incidunt voluptatum. </Card.Subtitle>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}
type Manga_swipperProps = {
    src : Array<Manga>;
}
export class Manga_swipper2 extends React.Component<Manga_swipperProps>{
    private manga_array : Array<Manga>;
    constructor(props: Manga_swipperProps){
        super(props);
        this.manga_array = this.props.src;
    }
    public async init_manga_elements(): Promise<Array<React.ReactNode>>{
        let array: Array<React.ReactNode> = [];
        for (let index = 0; index < this.manga_array.length; index++) {
            const element = this.manga_array[index];
            array[index] = (
                <SwiperSlide>
                    <Manga4 toUse={element}/>
                </SwiperSlide>
            );
        }
        return array;
    }
    render(): React.ReactNode {
        return (
            <React.Suspense fallback={
                <Chakra.Box
                    marginTop={"25px"}
                    marginBottom={"25px"}
                >
                    <Chakra.Center>
                        <Chakra.Spinner 
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }>
                <Await
                    resolve={this.init_manga_elements()}
                    errorElement={<ErrorELAsync/>}
                    children={(getted: Array<React.ReactNode>) => {
                            return (
                                <Swiper
                                    spaceBetween={2}
                                    slidesPerView={10}
                                    pagination={{
                                        dynamicBullets: true,
                                    }}
                                    mousewheel={true}
                                    modules={[Pagination, Autoplay, Mousewheel]}
                                    breakpoints={
                                        {
                                            576:{
                                                slidesPerView : 4,
                                                spaceBetween : 10
                                            },
                                            786:{
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            1200:{
                                                slidesPerView: 6,
                                                spaceBetween: 10,
                                            }
                                        }
                                    }
                                >
                                    {getted}
                                </Swiper>
                            );
                        }
                    }
                />
            </React.Suspense>
        );
    }
}