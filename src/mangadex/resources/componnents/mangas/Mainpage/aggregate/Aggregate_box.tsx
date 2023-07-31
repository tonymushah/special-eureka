import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Volume } from "@mangadex/api/structures/Volume";
import { Volume_, Volume__reverse } from "./Volume";
type Aggregate_boxProps = {
    src: Aggregate,
    isReverse?: boolean,
    separator: number,
    selected?: number
}

type Aggregate_boxState = {
    selected?: number,
    Chapters_parts: Array<Array<Volume>>
}

export function useSplitAggreateIntoPartsNumber({ src, separator } : {
    src : Aggregate,
    separator : number
}){
    return React.useMemo(() => {
        if (src.get_count() % separator != 0) {
            return Math.floor(src.get_count() / separator) + 1;
        } else {
            return Math.floor(src.get_count() / separator);
        }
    }, []);
}
export function useSpliceAggregate({ src, separator } : {
    src : Aggregate,
    separator : number
}){
    const parts = useSplitAggreateIntoPartsNumber({
        src,
        separator
    });
    return React.useMemo(() => {
        const returns = [];
        for (let index = 0; index < parts; index++) {
            returns.push(src.get_volumes().slice(index * separator, (index + 1) * separator));
        }        
        return returns;
    }, []);
}

export function Aggregate_box(props : Aggregate_boxProps){
    const
    const slices = React.useMemo(() => {} ,[

    ]);
}

export class Aggregate_box extends React.Component<Aggregate_boxProps, Aggregate_boxState>{
    private toUse: Aggregate;
    private separator: number;
    private parts!: number;
    private Chapters_parts: Array<Array<Volume>>;
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
                            this.Chapters_parts.map<React.ReactNode>((volumes, index) => (
                                <Chakra.TabPanel key={`tab-panel-${index}`}>
                                    <Chakra.Accordion
                                        allowMultiple={true}
                                        defaultIndex={[0]}
                                    >
                                        {
                                            volumes.map<React.ReactNode>((volume, index_) => (
                                                <Volume_ key={`volume-${index_}`} src={volume} open={true}/>
                                            ))
                                        } 
                                    </Chakra.Accordion>
                                </Chakra.TabPanel>
                            ))
                        }
                    </Chakra.TabPanels>
                    <Chakra.TabList>
                        {
                            this.Chapters_parts.map<React.ReactNode>((_, index__) => (
                                <Chakra.Tab key={`tab-${index__}`}>
                                    {index__}
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
    private parts!: number;
    private Chapters_parts: Array<Array<Volume>>;
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
        const to_use_volume: Array<Volume> = this.toUse.get_volumes().reverse();
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
                            this.Chapters_parts.map<React.ReactNode>((volumes, index) => (
                                <Chakra.TabPanel key={`tab-panel-${index}`}>
                                    <Chakra.Accordion
                                        allowMultiple={true}
                                        defaultIndex={[0]}
                                    >
                                        {
                                            volumes.map<React.ReactNode>((volume, index_) => (
                                                <Volume__reverse key={`volume-${index_}`} src={volume} open={true}/>
                                            ))
                                        } 
                                    </Chakra.Accordion>
                                </Chakra.TabPanel>
                            ))
                        }
                    </Chakra.TabPanels>
                    <Chakra.TabList>
                        {
                            this.Chapters_parts.map<React.ReactNode>((_, index) => (
                                <Chakra.Tab key={`tab-${index}`}>
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