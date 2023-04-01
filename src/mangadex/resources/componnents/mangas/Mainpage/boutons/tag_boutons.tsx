import React from "react";
import { Button, Row } from "react-bootstrap";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Tag } from "@mangadex/api/structures/Tag";
export function TagButton(props : {
    src : Tag
}){
    const tag_toUse: Tag = props.src;
    return (<Button style={{
        fontWeight : "800"
    }} className="m-1" variant="dark" size="sm">{tag_toUse.get_name().en}</Button>);
}
type TagRowProps = {
    src : Array<Tag>,
    title: string;
}
export class TagRow extends React.Component<TagRowProps>{
    private to_use: Array<Tag>;
    private title: string;
    constructor(props : TagRowProps){
        super(props);
        this.to_use = this.props.src;
        this.title = this.props.title;
    }
    public build_TagButtons(): Array<React.ReactNode>{
        let returns : Array<React.ReactNode> = new Array<React.ReactNode>(this.to_use.length);
        for (let index = 0; index < this.to_use.length; index++) {
            returns[index] = (<TagButton src={this.to_use[index]}/>);
        }
        return returns;
    }
    render(): React.ReactNode {
        let tagButtons : Array<React.ReactNode> = this.build_TagButtons()
        if(tagButtons.length != 0){
            return (
                <Row>
                    <h5>{make_first_UpperCare(this.title)}</h5>
                    <div className="d-md-inline">
                        {tagButtons}
                    </div>
                </Row>
            )
        }else{
            return (<></>);
        }
    }
}