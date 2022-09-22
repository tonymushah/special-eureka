import React from "react";
import { Manga } from "../structures/Manga";
import Card from "react-bootstrap/Card";

class El_Manga_simple{
    private to_use: Manga;
    private cover_image: string;
    constructor(to_use: Manga){
        this.to_use = to_use;
    }
    async get_cover_image(){
        this.cover_image = (await this.to_use.get_cover_art()).get_CoverImage_thumbnail(256);
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
        var returns = <Card className=" d-grid manga-simpleBOX">
            <Card.Img variant="top" src={this.cover_image}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
        return returns;
    }
}

export default El_Manga_simple;