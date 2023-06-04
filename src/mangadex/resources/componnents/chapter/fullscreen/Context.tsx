import { MutationKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChapterFullscreen(){
    const queryClient = useQueryClient();
    const queryKey : readonly string[] = ["mdx", "chapter", "fullscreen-mode"];
    const query = useQuery(queryKey, {
        "initialData" : false,
        queryFn: async () => {
            return false;
        },
    });
    const mutationKey : MutationKey = queryKey.concat("mutation");
    const update_mutation = useMutation({
        mutationFn : async (value : boolean) => {
            queryClient.setQueryData(queryKey, value);
        },
        mutationKey : mutationKey
    });
    return {
        queryKey,
        query,
        update_mutation,
        update : update_mutation.mutate,
        toggle : () => {
            if(query.data != undefined){
                update_mutation.mutate(!(query.data));
            }
        }
    };
}

export default function Initier(){
    useChapterFullscreen();
    return (
        <></>
    );
}