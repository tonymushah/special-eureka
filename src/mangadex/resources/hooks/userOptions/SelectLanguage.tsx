import { Lang } from "@mangadex/api/internal/Utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";

export default function useLanguageUserOption(){
    const queryKey = ["mdx", "user-option", "selectedLanguages"];
    const userCachedOption = useUserOption();
    const query = useQuery<Array<Lang>, Error>(queryKey, async () => {
        return await userCachedOption.getLanguages();
    }, {
        staleTime: Infinity,
        refetchOnMount : false
    });
    const changeOptionMutation = useMutation({
        mutationFn : async (new_ : Array<Lang>) => {
            await userCachedOption.setLanguages(new_);
        },
        onSuccess() {
            query.refetch();
        },
    });
    const changeOption = changeOptionMutation.mutate;
    const isIn = (input : Lang) => {
        if(query.isSuccess == true){
            return query.data.map((data) => data.get_two_letter()).includes(input.get_two_letter());
        }
        return undefined;
    };
    const add = (input: Lang) => {
        if(query.isSuccess == true){
            const data = query.data;
            data.push(input);
            changeOption(data);
        }
    };
    const remove = (input : Lang) => {
        if(query.isSuccess == true){
            changeOption(query.data.filter(item => item.get_two_letter() !== input.get_two_letter()));
        }
    };
    const handleInput = (input : Lang) => {
        if(isIn(input)){
            remove(input);
        }else{
            add(input);
        }
    };
    const clear = () => {
        changeOption([]);
    };
    return {
        queryKey,
        query,
        changeOption,
        handleInput,
        isIn,
        clear
    };
}