import React from "react";
import { Tag } from "../structures/Tag";
import ReactDOM from 'react-dom/client';
import { Button, ButtonGroup, Card, CardGroup, ProgressBar } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";

export class TagButton{
    private tag_toUse: Tag;
    public set_tag_toUse(tag_toUse: Tag){
        this.tag_toUse = tag_toUse;
    }
    public get_tag_toUse(): Tag{
        return this.tag_toUse;
    }
    public constructor(tag_toUse: Tag){
        this.set_tag_toUse(tag_toUse);
    }
    public render(): React.ReactNode{
        var returns = (
            <Button className="tag_bouton">
                {this.tag_toUse.get_name().en}
            </Button>
        );
        return returns;
    }
}