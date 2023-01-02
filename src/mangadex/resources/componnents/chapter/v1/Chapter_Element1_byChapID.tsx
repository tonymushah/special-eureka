import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react"

export default function Chapter_Element1_byChapID(props: {
    id: string
}) {
    const queryClient = useQueryClient()
    const toast = Chakra.useToast();
    const key = "mdx-chapter:" + props.id;
    const query = useQuery(key, () => {
        return Chapter.get_ChapterbyId(props.id);
    }, {
        staleTime: Infinity,
    });
    const download_query = useMutation({
        mutationFn : () => {
            return query.data!.download_this();
        },
        onError(error : Error){
            toast({
                position : "bottom-right",
                status : "error",
                isClosable : true,
                duration : 9000,
                title : "Error on downloading",
                description : error.message
            })
        },
        onSuccess(data, variables, context) {
            toast({
                position : "bottom-right",
                status : "success",
                isClosable : true,
                duration : 9000,
                title : "Downloaded chapter",
                description : props.id
            });
            queryClient.invalidateQueries({
                queryKey : key
            });
        },
    })
    const ErrorEL1 = React.lazy(() => import("../../error/ErrorEL1"));
    const Chapter_Element1 = React.lazy(() => import("./Chapter_Element1"));
    if (query.isLoading) {
        return (
            <Chakra.Box width={"full"}>
                <Chakra.Center>
                    <Chakra.Spinner />
                </Chakra.Center>
            </Chakra.Box>
        );
    }
    if (query.isError) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Box width={"full"}>
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <ErrorEL1 error={query.error} />
            </React.Suspense>
        )
    }
    return (
        <React.Suspense
            fallback={
                <Chakra.Box width={"full"}>
                    <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            <Chapter_Element1
                chapter={query.data!}
                downloadMutation={download_query}
            />
        </React.Suspense>
    );
    
}