import React from "react";
import { Manga } from "../structures/Manga";
import ReactDOM from 'react-dom/client';
import { ButtonGroup, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { TagButton } from "./TagBoxes";
class MangaCarousel{
    private to_use: Manga;
    private cover_image: string;
    constructor(to_use: Manga){
        this.to_use = to_use;
    }
    async get_cover_image(){
        this.cover_image = (await this.to_use.get_cover_art()).get_CoverImage();
    }
    async render(): Promise<React.ReactNode> {
        await this.get_cover_image();
        //var cover_to_use = <img src={this.cover_image} className="cover-image"/>
        var title = "";
        if (this.to_use.get_title().en == null) {
            title = this.to_use.get_alt_title()[0].id
        }else{
            title = this.to_use.get_title().en;
        }
        var tag_list:Array<React.ReactNode> = new Array(this.to_use.get_tags().length);
        for (let index = 0; index < tag_list.length; index++) {
            tag_list[index] = (new TagButton(this.to_use.get_tags()[index])).render();
        }
        var returns = (
            <Carousel.Item>
                <Container className="manga-simpleBOXES">
                    <Row>
                        <Col md="3" lg="3">
                            <Card>
                                <Card.Img src={this.cover_image}/>
                            </Card>
                        </Col>
                        <Col md="9" lg="9">
                            <h3>{title}</h3>
                            <Container>
                                <Row>
                                    <ButtonGroup>
                                        {tag_list}
                                    </ButtonGroup>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Carousel.Caption className="">
                </Carousel.Caption>
            </Carousel.Item>
        )
        return returns;
    }
}

export default MangaCarousel;