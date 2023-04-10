import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Manga } from "../../mangadex/api/structures/Manga";
import { ErrorELAsync } from "../../mangadex/resources/componnents/Error_cmp";
import { Alt_title, make_first_UpperCare, ContentRating } from "../../mangadex/api/internal/Utils";
import { Await } from "react-router-dom";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Statistics } from "../../mangadex/api/structures/Statistics";
import { Statis } from "../../mangadex/resources/componnents/mangas/Manga_Page";

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
        const returns: Array<React.ReactNode> = [];
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
            returns[index + index1] = (<Button className="mgP-top-theme d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>);
        }
        return returns;
    }
    render(): React.ReactNode {
        let title = "";
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
                                    
                                >
                                    {title}
                                </Chakra.Heading>
                            </Row>
                            <Row>
                                <React.Suspense
                                    fallback={<Chakra.Spinner />}
                                >
                                    <Await
                                        resolve={Statistics.get_statsBy_MangaID(this.to_use.get_id())}
                                        errorElement={<ErrorELAsync />}
                                    >
                                        {(stats: Statistics) => {
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