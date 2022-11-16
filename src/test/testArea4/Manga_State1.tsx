import React, { Suspense, useCallback } from "react"
import { Card, CardImg, Carousel, Row, Spinner } from "react-bootstrap";
import ReactDOM from 'react-dom/client';
import { Await } from "react-router-dom";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title, Lang_and_Data } from '../../mangadex/api/internal/Utils';
import { Manga, Manga_2 } from "../../mangadex/api/structures/Manga";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from "swiper";

export class Manga3 extends React.Component{
    private to_use : Manga;
    constructor(props){
        super(props);
        this.to_use = this.props.toUse;
    }
    render(): React.ReactNode {
        let title: string = "";
        let desc: string = "";
        if (this.to_use.get_title().en == null) {
            title = new Alt_title(this.to_use.get_alt_title()).get_quicklang()!;
        }else{
            title = this.to_use.get_title().en;
        }
        return (
            <Card className="manga-item3">
                <Card.Body>
                    <React.Suspense fallback={<Card.Img src="" className="manga-item3-img"/>}>
                        <Await
                            resolve={this.to_use.get_cover_art()}
                            errorElement={<p>Error while loading cover</p>}
                            children={(getted: Cover) => {
                                let coverpath: string = getted.get_CoverImage_thumbnail(256);
                                return (
                                    <>
                                        <React.Suspense>
                                            <Card.Img src={coverpath} className="manga-item3-img"/>
                                        </React.Suspense>
                                    </>
                                )
                            }}
                        />
                    </React.Suspense>
                    <div className="manga-item3-content overflow-hidden">
                        <Card.Title className="text-center text-lg-start">{title}</Card.Title>
                        <Card.Subtitle className=" d-none d-lg-flex">
                            <React.Suspense 
                                fallback={
                                    <Spinner animation="grow"></Spinner>
                                }
                            >
                                <Await 
                                    resolve={Lang_and_Data.initializeByDesc(this.to_use.get_description())}
                                    error={<p>Error while loading desc :\</p>}
                                    children={(getted: Array<Lang_and_Data>) => {
                                        return (<p>{getted[0].get_data()}</p>);
                                    }}
                                />
                            </React.Suspense>
                        </Card.Subtitle>
                    </div>
                </Card.Body>
            </Card>
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
export class Manga_swipper extends React.Component{
    private manga_array : Array<Manga>;
    constructor(props){
        super(props);
        this.manga_array = this.props.src;
    }
    public async init_manga_elements(): Promise<Array<React.ReactNode>>{
        let array: Array<React.ReactNode> = [];
        for (let index = 0; index < this.manga_array.length; index++) {
            const element = this.manga_array[index];
            array[index] = (
                <SwiperSlide>
                    <Manga3 toUse={element}/>
                </SwiperSlide>
            );
        }
        return array;
    }
    render(): React.ReactNode {
        return (
            <React.Suspense fallback={<Spinner animation="border"></Spinner>}>
                <Await
                    resolve={this.init_manga_elements()}
                    errorElement={<p>Error on loading</p>}
                    children={(getted: Array<React.ReactNode>) => {
                            return (
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={3}
                                        pagination={{
                                        dynamicBullets: true,
                                    }}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    mousewheel={true}
                                    loop={true}
                                    modules={[Pagination, Autoplay, Mousewheel]}
                                    breakpoints={
                                        {
                                            576:{
                                                slidesPerView : 4,
                                                spaceBetween : 10
                                            },
                                            768:{
                                                slidesPerView : 5,
                                                spaceBetween : 10
                                            },
                                            992:{
                                                slidesPerView : 3,
                                                spaceBetween : 10
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