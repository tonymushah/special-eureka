import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import React from "react";

type Props = ChapterPage_outlet_context;

const Context = React.createContext<Props | undefined>(undefined);

export function useDoublePageProps() : Props{
    const data = React.useContext(Context);
    if(data == undefined){
        throw new Error("The context provider is not implemented");
    }else{
        return data;
    }
}

export function DoublePagePropsProvider({ value, children } : React.PropsWithChildren<{
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