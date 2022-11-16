import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { Aggregate } from "../../../../../api/structures/Aggregate";
import { Volume_ } from "./Volume";
import { Volume } from "../../../../../api/structures/Volume";
import * as ChakraIcons from "@chakra-ui/icons"
import * as Chakra from "@chakra-ui/react"
type Aggregate_boxProps = {
    src: Aggregate
    separator: number
    selected? : number
}

type Aggregate_boxState = {
    selected? : number
}

var selected_ = 0;

export class Aggregate_box extends React.Component<Aggregate_boxProps, Aggregate_boxState>{
    private toUse: Aggregate;
    private separator : number;
    private parts: number;
    private Chapters_parts: Array<Array<Volume>>;
    private selected: number;
    constructor(props: Aggregate_boxProps){
        super(props);
        this.toUse = this.props.src;
        this.separator = this.props.separator;
        this.Chapters_parts = [];
        try {
            this.selected = selected_;
        } catch (error) {
            this.selected = this.props.selected? this.props.selected! : 0
        }
        
        this.set_parts();
        this.sliceAll();
        this.parts = this.Chapters_parts.length;
    }
    set_parts(){
        if(this.toUse.get_count() % this.separator != 0){
            this.parts = Math.floor(this.toUse.get_count() / this.separator) + 1;
        }else{
            this.parts = Math.floor(this.toUse.get_count() / this.separator);
        }
    }
    setSelected(part : number){
        this.state = {
            selected : part
        }
        this.selected = part;
    }
    sliceAll(){
        for(let index = 0; index < this.parts; index++){
            this.Chapters_parts[index] = (this.toUse.get_volumes().reverse().slice(index * this.separator, (index + 1) * this.separator));
        }
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Chakra.Tabs>
                    <Chakra.TabList>
                        {
                            this.Chapters_parts.map<React.ReactNode>((volume, index, array) => (
                                <Chakra.Tab>
                                    Volume {volume[0].name} to {volume[(volume.length - 1)].name}
                                </Chakra.Tab>
                            ))
                        }
                    </Chakra.TabList>
                    <Chakra.TabPanels>
                        {
                            this.Chapters_parts.map<React.ReactNode>((volumes, index, array) => (
                                <Chakra.TabPanel>
                                    <Chakra.Accordion defaultIndex={[0]} allowMultiple>
                                        {
                                            volumes.map<React.ReactNode>(volume => (
                                                <Volume_ src={volume} open={true}></Volume_>
                                            ))
                                        }
                                    </Chakra.Accordion>
                                </Chakra.TabPanel>
                            ))
                        }
                    </Chakra.TabPanels>
                </Chakra.Tabs>
                
            </React.Fragment>
        );
    }
}