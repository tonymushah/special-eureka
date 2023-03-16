import { Lang } from "@mangadex/api/internal/Utils";
import { useQuery, useQueryClient } from "react-query";

export default function useLanguageUserOption(){
    const queryKey = "mdx-user-option:selectedLanguages";
    const queryClient = useQueryClient();
    const query = useQuery<Array<Lang>, Error>(queryKey, async () => {
        return []
    }, {
        staleTime: Infinity,
        refetchOnMount : false,
        cacheTime: Infinity
    });
    const changeOption = (new_ : Array<Lang>) => {
        queryClient.setQueryData(queryKey, new_);
    }
    const isIn = (input : Lang) => {
        if(query.isSuccess == true){
            return query.data.includes(input);
        }else{
            return false;
        }
    }
    const add = (input: Lang) => {
        if(query.isSuccess == true){
            let data = query.data;
            data.push(input);
            changeOption(data);
        }
    }
    const remove = (input : Lang) => {
        if(query.isSuccess == true){
            changeOption(query.data.filter(item => item !== input));
        }
    }
    const handleInput = (input : Lang) => {
        if(isIn(input)){
            remove(input)
        }else{
            add(input);
        }
    }
    const clear = () => {
        changeOption([]);
    }
    return {
        queryKey,
        query,
        changeOption,
        handleInput,
        isIn,
        clear
    }
}