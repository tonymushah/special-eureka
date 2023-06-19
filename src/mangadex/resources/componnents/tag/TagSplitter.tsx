import Consumer from "@commons-res/components/Consumer";
import { Tag } from "@mangadex/api/structures/Tag";
import React from "react";

const context = React.createContext<TagSplitterData>({});

export type TagSplitterData = {
    [key : string]: Array<Tag>
}

export type TagSplitterDataEntry = {
    key : string,
    data : Array<Tag>
}

export function groupTag(tags : Array<Tag>) : TagSplitterData{
    const returns : TagSplitterData = {};
    tags.forEach((d) => {
        if(returns[d.get_group()] == undefined){
            returns[d.get_group()] = [];
        }
        returns[d.get_group()].push(d);
    });
    return returns;
}

export function useTagGroupSplitter() : TagSplitterData{
    return React.useContext(context);
}

type Array_TagsSplitter = Array<TagSplitterDataEntry>;

export function TagGroupsConsumer(props : {
    children : (value : Array_TagsSplitter) => React.ReactNode
}) {
    const data = useTagGroupSplitter();
    const to_render : Array_TagsSplitter = [];
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            to_render.push({
                key: key,
                data : element
            });
        }
    }
    return(
        <Consumer<Array_TagsSplitter> to_consume={to_render}>
            {props.children}
        </Consumer>
    );
}

export function EachTagGroupConsumer(props : {
    children : (value : TagSplitterDataEntry) => React.ReactNode
}){
    return (
        <TagGroupsConsumer>
            {(value) => (
                <React.Fragment>
                    {value.map((v) => props.children(v))}
                </React.Fragment>
            )}
        </TagGroupsConsumer>
    );
}

export function TagGroup(props : {
    key : string
    children : (d : Array<Tag>) => React.ReactNode
}){
    const data = useTagGroupSplitter();
    if(data[props.key] != undefined){
        return (
            <React.Fragment>
                <Consumer to_consume={data[props.key]}>
                    {props.children}
                </Consumer>
            </React.Fragment>
        );
    }else{
        throw new Error(`${props.key} data is undefined`);
    }
}

export function TagGroupSplitterProvider(props : React.PropsWithChildren<{
    tags : Array<Tag>
}>){
    return (
        <context.Provider value={groupTag(props.tags)}>
            {props.children}
        </context.Provider>
    );
}