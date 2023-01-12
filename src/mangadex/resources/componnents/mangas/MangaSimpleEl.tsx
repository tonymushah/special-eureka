import React from "react";
import * as Chakra from "@chakra-ui/react"
import { Button, Container, Row, Col } from "react-bootstrap";
import { Manga } from "../../../api/structures/Manga";
import { ErrorELAsync } from "../../../resources/componnents/Error_cmp";
import { Alt_title, make_first_UpperCare, ContentRating, Status } from "../../../api/internal/Utils";
import { Await, Link } from "react-router-dom";
import { Cover } from "../../../api/structures/Cover";
import { Statistics_Manga } from "../../../api/structures/Statistics";
import { Statis } from "../../../resources/componnents/mangas/Manga_Page";

type MangaSimpleProps = {
    src: Manga
}

export class MangaSimpleEl extends React.Component<MangaSimpleProps>{
    private to_use: Manga;
    constructor(props: MangaSimpleProps) {
        super(props);
        this.to_use = this.props.src;
    }
    public async build_themes_manga(): Promise<Array<React.ReactNode>> {
        let index = 0;
        let returns: Array<React.ReactNode> = [];
        if (this.to_use.get_ranting() != ContentRating.safe()) {
            if (this.to_use.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="success" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            } else {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < this.to_use.get_tags().length; index1++) {
            const element = this.to_use.get_tags()[index1];
            returns[index + index1] = (<Button className="mgP-top-theme d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>)
        }
        return returns;
    }
    render(): React.ReactNode {
        let title: string = "";
        //let desc: string = "";
        if (this.to_use.get_title().en == null) {
            title = new Alt_title(this.to_use.get_alt_title()).get_quicklang()!;
        } else {
            title = this.to_use.get_title().en;
        }
        return (
            <Chakra.Alert
                variant={"left-accent"}
                bgColor={"inherit"}
                as={Container}
            >
                <>
                    <Row>
                        <Col
                            xs={3}
                            md={2}
                            lg={3}
                        >
                            <React.Suspense
                                fallback={
                                    <Chakra.Spinner />
                                }
                            >
                                <Await
                                    resolve={this.to_use.get_cover_art()}
                                    errorElement={<ErrorELAsync />}
                                >
                                    {(getted_cover: Cover) => {
                                        return (
                                            <Chakra.Image
                                                src={getted_cover.get_CoverImage()}
                                            />
                                        );
                                    }}
                                </Await>
                            </React.Suspense>
                        </Col>
                        <Col
                            xs={9}
                            md={10}
                            lg={9}
                        >
                            <Row>
                                <Chakra.Heading
                                    size={{
                                        "base" : "md",
                                        "md" : "lg"
                                    }}
                                    as={Link}
                                    to={"/mangadex/manga/"+ this.to_use.get_id()}
                                >
                                    {title}
                                </Chakra.Heading>
                            </Row>
                            <Row>
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={Statistics_Manga.get_statsBy_MangaID(this.to_use.get_id())}
                                        errorElement={<ErrorELAsync />}
                                    >
                                        {(stats: Statistics_Manga) => {
                                            return (<Statis src={stats} />);
                                        }}
                                    </Await>
                                </React.Suspense>
                            </Row>
                            <Row>
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={this.build_themes_manga()}
                                        errorElement={<ErrorELAsync />}
                                    >
                                        {(themes: Array<React.ReactNode>) => {
                                            return (
                                                <Col
                                                    className=" overflow-x-scroll"
                                                >
                                                    {themes}
                                                </Col>
                                            );
                                        }}
                                    </Await>
                                </React.Suspense>
                            </Row>
                        </Col>
                    </Row>
                </>
            </Chakra.Alert>
        );
    }
}

export class MangaSimpleEl1 extends React.Component<MangaSimpleProps>{
    private to_use: Manga;
    constructor(props: MangaSimpleProps) {
        super(props);
        this.to_use = this.props.src;
    }
    public async build_themes_manga(): Promise<Array<React.ReactNode>> {
        let index = 0;
        let returns: Array<React.ReactNode> = [];
        if (this.to_use.get_ranting() != ContentRating.safe()) {
            if (this.to_use.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="success" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            } else {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(this.to_use.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < this.to_use.get_tags().length; index1++) {
            const element = this.to_use.get_tags()[index1];
            returns[index + index1] = (<Button className="mgP-top-theme d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>)
        }
        return returns;
    }
    public get_status_color(): React.ReactNode {
        switch (this.to_use.get_status()) {
            case Status.ongoing():
                return (<Button size="sm" variant="success" disabled> </Button>)
                break;
            case Status.completed():
                return (<Button size="sm" variant="info" disabled> </Button>)
                break;
            case Status.hiatus():
                return (<Button size="sm" variant="warning" disabled> </Button>)
                break;
            case Status.cancelled():
                return (<Button size="sm" variant="danger" disabled> </Button>)
                break;
            default:
                return (<></>);
                break;
        }
    }
    render(): React.ReactNode {
        let title: string = "";
        //let desc: string = "";
        if (this.to_use.get_title().en == null) {
            title = new Alt_title(this.to_use.get_alt_title()).get_quicklang()!;
        } else {
            title = this.to_use.get_title().en;
        }
        return (
            <Chakra.Alert
                variant={"left-accent"}
                bgColor={"inherit"}
                as={Container}
            >
                <>
                    <Row>
                        <Col
                            xs={3}
                            md={2}
                            lg={2}
                        >
                            <React.Suspense
                                fallback={
                                    <Chakra.Spinner />
                                }
                            >
                                <Await
                                    resolve={this.to_use.get_cover_art()}
                                    errorElement={<ErrorELAsync />}
                                >
                                    {(getted_cover: Cover) => {
                                        return (
                                            <Chakra.Image
                                                src={getted_cover.get_CoverImage()}
                                            />
                                        );
                                    }}
                                </Await>
                            </React.Suspense>
                        </Col>
                        <Col
                            xs={9}
                            md={10}
                            lg={10}
                        >
                            <Row>
                                <Link
                                    to={"/mangadex/manga/" + this.to_use.get_id()}
                                >
                                    <Chakra.Heading
                                        size={{
                                            "base" : "md",
                                            "md" : "lg"
                                        }}
                                    >
                                        {title}
                                    </Chakra.Heading>
                                </Link>
                            </Row>
                            <Row>
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={Statistics_Manga.get_statsBy_MangaID(this.to_use.get_id())}
                                        errorElement={<ErrorELAsync />}
                                    >
                                        {(stats: Statistics_Manga) => {
                                            return (<Statis src={stats} />);
                                        }}
                                    </Await>
                                </React.Suspense>
                            </Row>
                            <Row>
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={this.build_themes_manga()}
                                        errorElement={<ErrorELAsync />}
                                    >
                                        {(themes: Array<React.ReactNode>) => {
                                            return (
                                                <Col
                                                    className=" overflow-x-scroll"
                                                >
                                                    {themes}
                                                </Col>
                                            );
                                        }}
                                    </Await>
                                </React.Suspense>
                            </Row>
                            <Row>
                                <Chakra.Heading size="md">Publication : {this.get_status_color()} {make_first_UpperCare(this.to_use.get_status())}</Chakra.Heading>
                            </Row>
                        </Col>
                    </Row>
                </>
            </Chakra.Alert>
        );
    }
}