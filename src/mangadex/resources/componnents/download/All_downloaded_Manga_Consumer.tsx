import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";
import { BeatLoader } from "react-spinners";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";

export default function AllDownlaodedMangaConsumer(props : {
    children : (value : Array<string>) => React.ReactNode,
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, "queryKey" | "queryFn">,
}) {
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const query_key = ["mdx", "dowloaded_manga"];
    const toast = useChakraToast({
        id : JSON.stringify(query_key)
    });
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
            });
        },
        onError(error : Error) {
            toast({
                position : "bottom-right",
                title : "Error on patching",
                description : error.message,
                status : "error",
                "duration" : 9000,
                "isClosable" : true
            });
        },
    });
    const refetch = useMutation({
        mutationKey : query_key.concat("refetch"),
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
            });
        },
        onError(error : Error) {
            toast({
                position : "bottom-right",
                title : "Error on patching",
                description : error.message,
                status : "error",
                "duration" : 9000,
                "isClosable" : true
            });
        },
    });
    return(
        <Chakra.Box>
            <Chakra.Button
                isLoading={queryClient.isFetching(query_key) != 0}
                spinner={<BeatLoader size={8}/>}
                onClick={() => {
                    queryClient.resetQueries(query_key);
                }}
            >Refresh</Chakra.Button>
            &nbsp;
            <Chakra.Button
                isLoading={patch_all_manga.isLoading}
                spinner={<BeatLoader size={8}/>}
                colorScheme={"facebook"}
                onClick={() => patch_all_manga.mutate()}
            >Patch all manga cover</Chakra.Button>
            &nbsp;
            <Chakra.Button
                isLoading={refetch.isLoading}
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
                query_options={props.query_options}
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