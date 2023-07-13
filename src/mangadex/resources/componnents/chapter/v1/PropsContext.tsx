import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";

type Props = {
    chapter : Chapter
}

const Context = React.createContext<Props | undefined>(undefined);

export function usePropsChapter() : Props{
    const data = React.useContext(Context);
    if(data == undefined){
        throw new Error("The context provider is not implemented");
    }else{
        return data;
    }
}

export function ChapterPropsProvider({ value, children } : React.PropsWithChildren<{
    value : Props
}>){
    return (
        <Context.Provider value={value}>
            { 
                children
            }
        </Context.Provider>
    );
}