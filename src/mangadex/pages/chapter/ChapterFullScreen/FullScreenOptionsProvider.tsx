import React from "react";
import { useQuery, useQueryClient } from "react-query";

export type FullScreenOptions_Context = {
    image_width : number
}

const context = React.createContext<FullScreenOptions_Context | undefined>(undefined);

export function useFullScreenOptions_Query(){
    const query_key = "mdx-chapter-fullscreen-option";
    const query = useQuery<FullScreenOptions_Context | undefined>(query_key, () => {
        return new Promise((resolve) => {
            resolve(undefined);
        });
    }, {
        staleTime: Infinity
    });
    const queryClient = useQueryClient();
    const updateOptions = (option: FullScreenOptions_Context) => {
        queryClient.setQueryData(query_key, option);
    };
    return {
        query_key,
        query,
        updateOptions
    };
}

export default function FullScreenOptionsProvider(props : React.PropsWithChildren){
    const { query } = useFullScreenOptions_Query();
    return (
        <context.Provider value={query.data}>
            {
                props.children
            }
        </context.Provider>
    );
}

export function useFullScreenOptions(){
    return React.useContext(context);
}
