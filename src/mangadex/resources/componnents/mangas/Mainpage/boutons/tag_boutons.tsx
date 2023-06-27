import React from "react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Tag } from "@mangadex/api/structures/Tag";
import { VStack, Button, Wrap, WrapItem } from "@chakra-ui/react";
export function TagButton(props : {
    src : Tag
}){
    const tag_toUse: Tag = props.src;
    return (<Button style={{
        fontWeight : "800"
    }} colorScheme={"blackAlpha"} variant={"solid"} size="sm">{tag_toUse.get_name().en}</Button>);
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
        const returns : Array<React.ReactNode> = new Array<React.ReactNode>(this.to_use.length);
        for (let index = 0; index < this.to_use.length; index++) {
            returns[index] = (<TagButton src={this.to_use[index]}/>);
        }
        return returns;
    }
    render(): React.ReactNode {
        const tagButtons : Array<React.ReactNode> = this.build_TagButtons();
        if(tagButtons.length != 0){
            return (
                <VStack>
                    <h5>{make_first_UpperCare(this.title)}</h5>
                    <Wrap className="d-md-inline">
                        {tagButtons.map((iteme, index) => (
                            <WrapItem key={`${this.title}-${index}`}>{iteme}</WrapItem>
                        ))}
                    </Wrap>
                </VStack>
            );
        }else{
            return (<React.Fragment/>);
        }
    }
}