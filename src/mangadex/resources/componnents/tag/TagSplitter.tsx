import Consumer from "@commons-res/components/Consumer";
import { Tag } from "@mangadex/api/structures/Tag";
import React from "react";

const context = React.createContext<TagSplitterData>({});

export type TagSplitterData = {
    [key : string]: Array<Tag>
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

export function TagGroups()

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