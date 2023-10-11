import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import { Aggregate } from "@mangadex/api/structures/Aggregate";
import { Volume_ } from "./Volume";
type Aggregate_boxProps = {
    src: Aggregate,
    isReverse?: boolean,
    separator: number,
    selected?: number
}

export function useSplitAggreateIntoPartsNumber({ src, separator }: {
    src: Aggregate,
    separator: number
}) {
    return React.useMemo(() => {
        if (src.get_count() % separator != 0) {
            return Math.floor(src.get_count() / separator) + 1;
        } else {
            return Math.floor(src.get_count() / separator);
        }
    }, [src, separator]);
}

export function useSpliceAggregate({ src, separator }: {
    src: Aggregate,
    separator: number
}) {
    const parts = useSplitAggreateIntoPartsNumber({
        src,
        separator
    });
    const volumes = React.useMemo(() => src.get_volumes(), [src]);
    return React.useMemo(() => {
        const returns = [];
        for (let index = 0; index < parts; index++) {
            returns.push(volumes.slice(index * separator, (index + 1) * separator));
        }
        return returns;
    }, [volumes, separator]);
}

export function Aggregate_box(props: Aggregate_boxProps) {
    const src = React.useMemo(() => {
        if (props.isReverse == true) {
            props.src.sortVolumesChapters(true);
            return props.src;
        } else {
            props.src.sortVolumesChapters(false);
            return props.src;
        }
    }, [props.isReverse, props.src]);
    const slices = useSpliceAggregate({ src, separator: props.separator });
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
                                            <Volume_ key={`volume-${index_}`} src={volume} open={true} />
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
