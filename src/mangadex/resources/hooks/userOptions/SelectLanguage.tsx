import { Lang } from "@mangadex/api/internal/Utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserOption } from "@mangadex/resources/componnents/userOption/utils/UserOptionProvider";
import React from "react";

export default function useLanguageUserOption() {
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const userCachedOption = useUserOption();
    const query = useQuery<Array<Lang>, Error>(_queryKey_, async () => {
        return await userCachedOption.getLanguages();
    }, {
        staleTime: Infinity,
        refetchOnMount: false
    });
    const changeOptionMutation = useMutation({
        mutationFn: async (new_: Array<Lang>) => {
            await userCachedOption.setLanguages(new_);
        },
        onSuccess() {
            query.refetch();
        },
    });
    const changeOption = changeOptionMutation.mutate;
    const isIn = (input: Lang) => {
        if (query.isSuccess == true) {
            return query.data.map((data) => data.get_two_letter()).includes(input.get_two_letter());
        }
        return undefined;
    };
    const add = (input: Lang) => {
        if (query.isSuccess == true) {
            const data = query.data;
            data.push(input);
            changeOption(data);
        }
    };
    const remove = (input: Lang) => {
        if (query.isSuccess == true) {
            changeOption(query.data.filter(item => item.get_two_letter() !== input.get_two_letter()));
        }
    };
    const handleInput = (input: Lang) => {
        if (isIn(input) == true) {
            remove(input);
        } else {
            add(input);
        }
    };
    const clear = () => {
        changeOption([]);
    };
    return {
        queryKey: _queryKey_,
        query,
        changeOption,
        handleInput,
        isIn,
        clear
    };
}

function queryKey() {
    return ["mdx", "user-option", "selectedLanguages"];
}
