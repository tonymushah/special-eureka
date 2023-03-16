import { Lang } from "@mangadex/api/internal/Utils";
import { useQuery, useQueryClient } from "react-query";

export default function useLanguageUserOption(){
    const queryKey = "mdx-user-option:selectedLanguages";
    const queryClient = useQueryClient();
    const query = useQuery<Array<Lang>>(queryKey, async () => {
        return []
    }, {
        staleTime: Infinity
    });
    const changeOption = (new_ : Array<Lang>) => {
        queryClient.setQueryData(queryKey, new_);
    }
    return {
        queryKey,
        query,
        changeOption
    }
}