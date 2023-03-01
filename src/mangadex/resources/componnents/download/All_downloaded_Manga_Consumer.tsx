import * as Chakra from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient, UseQueryOptions } from "react-query";
import Consumer from "../../../../commons-res/components/Consumer";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Collection } from "../../../api/structures/Collection";
import { Manga } from "../../../api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";


function This_Suspense(props: React.PropsWithChildren){
    return (
        <React.Suspense
            fallback={
                <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    )
}

export default function AllDownlaodedMangaConsumer(props : {
    children : (value : Array<string>) => React.ReactNode,
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, 'queryKey' | 'queryFn'>,
}) {
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const toast = useToast();
    const query_key = "mdx-dowloaded_manga";
    const patch_all_manga = useMutation({
        mutationFn : () => {
            toast({
                position : "bottom-right",
                title : "Patching all manga...",
                status : "loading",
                "duration" : 9000,
                "isClosable" : true
            });
            return Manga.patch_all_manga_cover(client);
        },
        mutationKey : query_key,
        onSuccess : () => {
            toast({
                position : "bottom-right",
                title : "Patched",
                status : "success",
                "duration" : 9000,
                "isClosable" : true
            });
            queryClient.refetchQueries({
                queryKey : query_key
            })
        },
        onError(error : Error, variables, context) {
            toast({
                position : "bottom-right",
                title : "Error on patching",
                description : error.message,
                status : "error",
                "duration" : 9000,
                "isClosable" : true
            });
        },
    })
    const refetch = useMutation({
        mutationFn : () => {
            toast({
                position : "bottom-right",
                title : "Patching all manga...",
                status : "loading",
                "duration" : 9000,
                "isClosable" : true
            });
            return Manga.refetch_all_manga(client);
        },
        onSuccess : () => {
            toast({
                position : "bottom-right",
                title : "Patched",
                status : "success",
                "duration" : 9000,
                "isClosable" : true
            });
            queryClient.refetchQueries({
                queryKey : query_key
            })
        },
        onError(error : Error, variables, context) {
            toast({
                position : "bottom-right",
                title : "Error on patching",
                description : error.message,
                status : "error",
                "duration" : 9000,
                "isClosable" : true
            });
        },
    })
    return(
        <Chakra.Box>
            <Chakra.Button
                onClick={() => {
                    queryClient.resetQueries(query_key);
                }}
            >Refresh</Chakra.Button>
            &nbsp;
            <Chakra.Button
                colorScheme={"facebook"}
                onClick={() => patch_all_manga.mutate()}
            >Patch all manga cover</Chakra.Button>
            &nbsp;
            <Chakra.Button
                colorScheme={"orange"}
                onClick={() => refetch.mutate()}
            >Refetch all manga</Chakra.Button>

            <CollectionComponnent_WithQuery<string>
                fn={() => {
                    return Manga.getAllDownloadedMangaID(undefined, client);
                }}
                queryKey={query_key}
                onLoading={
                    <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
                }
            >{
                (value) => (
                    <Consumer<Array<string>> to_consume={value.get_data()}>
                        {
                            props.children
                        }
                    </Consumer>
                )
            }</CollectionComponnent_WithQuery>
        </Chakra.Box>
    );
}