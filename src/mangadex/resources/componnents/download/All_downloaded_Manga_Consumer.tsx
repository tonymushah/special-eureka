import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Await } from "react-router-dom";
import { ErrorELAsync1 } from "../Error_cmp";
import { Manga } from "../../../api/structures/Manga";
import MangaElementDef_wID from "../mangas/v1/MangaElementDef_wID";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ErrorEL1 from "../error/ErrorEL1";
import { useToast } from "@chakra-ui/react";
import Consumer from "../../../../commons-res/components/Consumer";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";



export default function AllDownlaodedMangaConsumer(props : {
    children : (value : Array<string>) => React.ReactNode
}) {
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const toast = useToast();
    const query_key = "mdx-dowloaded_manga";
    const query = useQuery<Array<string>, Error>(query_key, () => {
        return Manga.getAllDownloadedMangaID(client);
    }, {
        staleTime : Infinity
    })
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
            queryClient.invalidateQueries({
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
            console.error(error)
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
            queryClient.invalidateQueries({
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
            console.error(error)
        },
    })
    return(
        <Chakra.Box>
            <Chakra.Button
                onClick={() => query.refetch()}
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
            {
                query.isRefetching ? (
                    <Chakra.Heading size={"sm"}>Refreshing...</Chakra.Heading>
                ) : null
            }
            {
                query.isFetching ? (
                    <Chakra.Heading size={"sm"}>Fetching data...</Chakra.Heading>
                ) : null
            }
            {
                query.isError ? (
                    <ErrorEL1 error={query.error!}/>
                ) : null
            }
            {
                query.isLoading ? (
                    <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
                ) : null
            }
            {
                query.isSuccess == true && query.isFetching == false && query.isRefetching == false && query.isLoading == false ? (
                    <Consumer<Array<string>> to_consume={query.data}>
                        {
                            props.children
                        }
                    </Consumer>
                ) : null
            }
        </Chakra.Box>
    )
}