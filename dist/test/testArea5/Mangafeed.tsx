import React from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Cover_Image_ } from "./Image_";
import { Chapter_ } from "../../mangadex/resources/componnents/chapters/Chapter_";
import { Await } from "react-router-dom";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title, Asc_Desc, Offset_limits, Order } from "../../mangadex/api/internal/Utils";
import { Response } from "@tauri-apps/api/http";
import { Chapter } from "../../mangadex/api/structures/Chapter";
export class Mangafeed extends React.Component{
    private MangaToUse: Manga;
    constructor(props){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
        let desc: string = "";
        if (this.MangaToUse.get_title().en == null) {
            title = new Alt_title(this.MangaToUse.get_alt_title()).get_quicklang()!;
        }else{
            title = this.MangaToUse.get_title().en;
        }
        let offset_limits_1 : Offset_limits = new Offset_limits();
        offset_limits_1.set_limits(2);
        return (
            <Container {...this.props}>
                <Row>
                    <Col xs="4" sm="4" md="3" lg="3" xl="2">
                        <React.Suspense fallback={<p>Loading cover</p>}>
                            <Await
                                resolve={this.MangaToUse.get_cover_art()}
                                errorElement={<p>Error on loading cover</p>}
                                children={(getted: Cover) =>{
                                    return (
                                        <Cover_Image_ id="top-image" src={getted}/>
                                    )
                                }}
                            />
                        </React.Suspense>
                    </Col>
                        <Col xs="8" sm="8" md="9" lg="9" xl="10">
                        <Container>
                            <Row className="mb-xs-1 mb-lg-5 mb-sm-1">
                                <h3 >{title}</h3>
                            </Row>
                            <Row className="mb-lg-5 mb-sm-1">
                                <React.Suspense fallback={<Spinner animation="grow" size="lg"/>}>
                                    <Await
                                        resolve={this.MangaToUse.getFeed(
                                            offset_limits_1,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            undefined,
                                            new Order(
                                                undefined,
                                                Asc_Desc.desc()
                                            )
                                        )}
                                        errorElement={<p>This Manga has no chapter {"(maybe...)"}</p>}
                                        children={(getted : Array<Chapter> | Response<any>) => {
                                            if(getted instanceof Array<Chapter>){
                                                return (
                                                <>
                                                    <Chapter_ chapter={getted![0]}/>
                                                    <Chapter_ chapter={getted![1]}/>
                                                </>
                                                );
                                            }else{
                                                return (<p>This Manga has no chapter {"(maybe...)"}</p>);
                                            }
                                        }}
                                    />
                                </React.Suspense>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}
/*
                                <Chapter_/>
                                <Chapter_ className=" d-none d-sm-block"/>
                                
*/