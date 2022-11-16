import React from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { Manga } from "../../../api/structures/Manga";
import { Cover_Image_ } from "./Image_";
import { Chapter_, Chapter_2, Chapter_includes2 } from "../../../resources/componnents/chapters/Chapter_";
import { Await, Link } from "react-router-dom";
import { Cover } from "../../../api/structures/Cover";
import { Alt_title, Asc_Desc, Offset_limits, Order } from "../../../api/internal/Utils";
import { Response } from "@tauri-apps/api/http";
import { Chapter, Chapter_withAllIncludes } from "../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react"
import { ErrorELAsync } from "../../../resources/componnents/Error_cmp";
type MangafeedProps = {
    src : Manga
}
export class Mangafeed extends React.Component<MangafeedProps>{
    private MangaToUse: Manga;
    constructor(props: MangafeedProps){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
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
                                            {
                                                offset_Limits : offset_limits_1,
                                                order: new Order(
                                                    undefined,
                                                    Asc_Desc.desc()
                                                )
                                            }
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
export class Manga_WithLatest_Chap_0 extends React.Component<MangafeedProps>{
    private MangaToUse: Manga;
    constructor(props: MangafeedProps){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
        if (this.MangaToUse.get_title().en == null) {
            title = new Alt_title(this.MangaToUse.get_alt_title()).get_quicklang()!;
        }else{
            title = this.MangaToUse.get_title().en;
        }
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
                                <React.Suspense fallback={
                                    <Chakra.AbsoluteCenter>
                                        <Spinner animation="grow" size="lg"/>
                                    </Chakra.AbsoluteCenter>
                                }>
                                    <Await
                                        resolve={this.MangaToUse.get_latestUploadedChapter()}
                                        errorElement={<p>This Manga has no chapter {"(maybe...)"}</p>}
                                        children={(getted : Chapter ) => {
                                                return (
                                                <>
                                                    <Chapter_ chapter={getted}/>
                                                </>
                                                );
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
export class Manga_WithLatest_Chap_1 extends React.Component<MangafeedProps>{
    private MangaToUse: Manga;
    constructor(props: MangafeedProps){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
        if (this.MangaToUse.get_title().en == null) {
            title = new Alt_title(this.MangaToUse.get_alt_title()).get_quicklang()!;
        }else{
            title = this.MangaToUse.get_title().en;
        }
        let offset_limits_1 : Offset_limits = new Offset_limits();
        offset_limits_1.set_limits(1);
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
                                            {
                                                offset_Limits : offset_limits_1,
                                                order: new Order(
                                                    undefined,
                                                    undefined,
                                                    undefined,
                                                    Asc_Desc.desc()
                                                )
                                            }
                                        )}
                                        errorElement={<ErrorELAsync/>}
                                        children={(getted : Array<Chapter>) => {
                                            return (
                                                <>
                                                    <Chapter_ chapter={getted[0]}/>
                                                </>
                                            );
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
export class Manga_WithLatest_Chap_01 extends React.Component<MangafeedProps>{
    private MangaToUse: Manga;
    constructor(props: MangafeedProps){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
        if (this.MangaToUse.get_title().en == null) {
            title = new Alt_title(this.MangaToUse.get_alt_title()).get_quicklang()!;
        }else{
            title = this.MangaToUse.get_title().en;
        }
        return (
            <Container {...this.props}>
                <Row>
                    <Col xs="4">
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
                    <Col xs="8">
                        <Container>
                            <Row className="mb-xs-1 mb-lg-1 mb-sm-1">
                                <Chakra.Heading as={"h3"} size={"md"}><Link to={"/mangadex/manga/" + this.MangaToUse.get_id()}>{title}</Link></Chakra.Heading>
                            </Row>
                            <Row className="mb-lg-5 mb-sm-1">
                                <React.Suspense fallback={
                                    <Chakra.Center>
                                        <Chakra.Spinner/>
                                    </Chakra.Center>
                                }>
                                    <Await
                                        resolve={this.MangaToUse.get_latestUploadedChapter_all()}
                                        errorElement={<p>This Manga has no chapter {"(maybe...)"}</p>}
                                        children={(getted : Chapter_withAllIncludes ) => {
                                                return (
                                                <>
                                                    <Chapter_includes2 chapter={getted}/>
                                                </>
                                                );
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
export class Manga_WithLatest_Chap_11 extends React.Component<MangafeedProps>{
    private MangaToUse: Manga;
    constructor(props: MangafeedProps){
        super(props);
        this.MangaToUse = this.props.src;
    }
    render(): React.ReactNode {
        //let manga_cover: string = "./imgs/cover_image1.jpg";
        let title: string = "";
        if (this.MangaToUse.get_title().en == null) {
            title = new Alt_title(this.MangaToUse.get_alt_title()).get_quicklang()!;
        }else{
            title = this.MangaToUse.get_title().en;
        }
        let offset_limits_1 : Offset_limits = new Offset_limits();
        offset_limits_1.set_limits(1);
        return (
            <Container {...this.props}>
                <Row>
                    <Col xs="4" >
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
                    <Col xs="8">
                        <Container>
                            <Row className="mb-xs-1 mb-lg-1 mb-sm-1">
                                <h3 >{title}</h3>
                            </Row>
                            <Row className="mb-lg-5 mb-sm-1">
                                <React.Suspense fallback={<Spinner animation="grow" size="lg"/>}>
                                    <Await
                                        resolve={this.MangaToUse.getFeed_All(
                                            {
                                                offset_Limits : offset_limits_1,
                                                order: new Order(
                                                    undefined,
                                                    undefined,
                                                    undefined,
                                                    Asc_Desc.desc()
                                                )
                                            }
                                        )}
                                        errorElement={<ErrorELAsync/>}
                                        children={(getted : Array<Chapter_withAllIncludes>) => {
                                            return (
                                                <>
                                                    <Chapter_includes2 chapter={getted[0]}/>
                                                </>
                                            );
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