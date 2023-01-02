import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { Aggregate } from "../../../../../api/structures/Aggregate";
import { Volume_, Volume__reverse } from "./Volume";
import { Volume } from "../../../../../api/structures/Volume";
import * as ChakraIcons from "@chakra-ui/icons"
import * as Chakra from "@chakra-ui/react"
type Aggregate_boxProps = {
    src: Aggregate
    separator: number
    selected?: number
}

type Aggregate_boxState = {
    selected?: number,
    Chapters_parts: Array<Array<Volume>>
}

export class Aggregate_box extends React.Component<Aggregate_boxProps, Aggregate_boxState>{
    private toUse: Aggregate;
    private separator: number;
    private parts: number;
    private Chapters_parts: Array<Array<Volume>>;
    private selected: number;
    constructor(props: Aggregate_boxProps) {
        super(props);
        this.toUse = this.props.src;
        this.separator = this.props.separator;
        this.Chapters_parts = [];
        this.set_parts();
        this.sliceAll();
    }
    set_parts() {
        if (this.toUse.get_count() % this.separator != 0) {
            this.parts = Math.floor(this.toUse.get_count() / this.separator) + 1;
        } else {
            this.parts = Math.floor(this.toUse.get_count() / this.separator);
        }
    }
    sliceAll() {
        for (let index = 0; index < this.parts; index++) {
            this.Chapters_parts[index] = (this.toUse.get_volumes().slice(index * this.separator, (index + 1) * this.separator));
        }
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Chakra.Tabs isLazy>
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
                    <Chakra.TabList>
                        {
                            this.Chapters_parts.map<React.ReactNode>((volume, index, array) => (
                                <Chakra.Tab>
                                    {index}
                                </Chakra.Tab>
                            ))
                        }
                    </Chakra.TabList>
                </Chakra.Tabs>
            </React.Fragment>
        );
    }
}

export class Aggregate_box_reverse extends React.Component<Aggregate_boxProps, Aggregate_boxState>{
    private toUse: Aggregate;
    private separator: number;
    private parts: number;
    private Chapters_parts: Array<Array<Volume>>;
    private selected: number;
    constructor(props: Aggregate_boxProps) {
        super(props);
        this.toUse = this.props.src;
        this.separator = this.props.separator;
        this.Chapters_parts = [];
        this.set_parts();
        this.sliceAll();
    }
    set_parts() {
        if (this.toUse.get_count() % this.separator != 0) {
            this.parts = Math.floor(this.toUse.get_count() / this.separator) + 1;
        } else {
            this.parts = Math.floor(this.toUse.get_count() / this.separator);
        }
    }
    sliceAll() {
        let to_use_volume : Array<Volume> = this.toUse.get_volumes().reverse();
        for (let index = 0; index < this.parts; index++) {
            this.Chapters_parts[index] = (to_use_volume.slice(index * this.separator, (index + 1) * this.separator));
        }
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Chakra.Tabs isLazy>
                    <Chakra.TabPanels>
                        {
                            this.Chapters_parts.map<React.ReactNode>((volumes, index, array) => (
                                <Chakra.TabPanel>
                                    <Chakra.Accordion defaultIndex={[0]} allowMultiple>
                                        {
                                            volumes.map<React.ReactNode>(volume => (
                                                <Volume__reverse src={volume} open={true}></Volume__reverse>
                                            ))
                                        }
                                    </Chakra.Accordion>
                                </Chakra.TabPanel>
                            ))
                        }
                    </Chakra.TabPanels>
                    <Chakra.TabList>
                        {
                            this.Chapters_parts.map<React.ReactNode>((volume, index, array) => (
                                <Chakra.Tab>
                                    {index}
                                </Chakra.Tab>
                            ))
                        }
                    </Chakra.TabList>
                </Chakra.Tabs>
            </React.Fragment>
        );
    }
}