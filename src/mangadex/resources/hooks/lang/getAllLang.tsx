import { Lang, Languages } from "@mangadex/api/internal/Utils";
import { useQuery } from "react-query";

export function getLanguages(){
    const queryKey = "mdx-languages";
    const query = useQuery<Languages>(queryKey, async () =>{
        return await Languages.initialize();
    }, {
        staleTime : Infinity
    });
    return {
        queryKey,
        query
    };
}

export function getAllLang(){
    const required_query = getLanguages().query;
    const queryKey = "mdx-all-langs";
    const query = useQuery<Array<Lang>>(queryKey, async () => {
        if(required_query.isSuccess){
            return required_query.data?.get_langs();
        }else{
            return [];
        }
    }, {
        staleTime : Infinity,
        enabled : !!required_query.data
    });
    return {
        queryKey,
        query
    };
}