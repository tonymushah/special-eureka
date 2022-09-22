import React, { useState } from "react";
import { Manga } from "../structures/Manga";
import { Accordion, Button, ButtonGroup, Card, Col, Collapse, Container, Row } from "react-bootstrap";
import { Tag } from "../structures/Tag";
import { TagButton } from "./TagBoxes";
class El_Manga_simple2{
    private to_use: Manga;
    private cover_image: string;
    constructor(to_use: Manga){
        this.to_use = to_use;
    }
    async get_cover_image(){
        this.cover_image = (await this.to_use.get_cover_art()).get_CoverImage_thumbnail(256);
    }
    public async render(): Promise<React.ReactNode> {
        await this.get_cover_image();
        //var cover_to_use = <img src={this.cover_image} className="cover-image"/>
        var title = "";
        if (this.to_use.get_title().en == null) {
            for (const key in this.to_use.get_alt_title()) {
                if (Object.prototype.hasOwnProperty.call(this.to_use.get_alt_title(), key)) {
                    const element = this.to_use.get_alt_title()[key];
                    
                }
            }
            title = this.to_use.get_alt_title()[0].id
        }else{
            title = this.to_use.get_title().en;
        }
        var tag_list:Array<React.ReactNode> = new Array(this.to_use.get_tags().length);
        for (let index = 0; index < tag_list.length; index++) {
            tag_list[index] = (new TagButton(this.to_use.get_tags()[index])).render();
        }
        var returns = (
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
                                <Row>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Description</Accordion.Header>
                                            <Accordion.Body>
                                                <p>{this.to_use.get_description().en}</p>
                                                <p>{this.to_use.get_description().id}</p>
                                                <p>{this.to_use.get_description().ja}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
        );
        return returns;
    }
}

export default El_Manga_simple2;