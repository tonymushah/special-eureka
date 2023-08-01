import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Volume_, Volume__reverse } from "./Volume";
type Aggregate_boxProps = {
    src: Aggregate,
    isReverse?: boolean,
    separator: number,
    selected?: number
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
    const slices = useSpliceAggregate(props);
    if(props.isReverse){
        return (
            <React.Fragment>
                <Chakra.Tabs isLazy>
                    <Chakra.TabPanels>
                        {
                            slices.map<React.ReactNode>((volumes, index) => (
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
                            slices.map<React.ReactNode>((_, index) => (
                                <Chakra.Tab key={`tab-${index}`}>
                                    {index}
                                </Chakra.Tab>
                            ))
                        }
                    </Chakra.TabList>
                </Chakra.Tabs>
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                <Chakra.Tabs isLazy>
                    <Chakra.TabPanels>
                        {
                            slices.map<React.ReactNode>((volumes, index) => (
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
                            slices.map<React.ReactNode>((_, index__) => (
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
