import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { Api_Request } from "../../api/internal/Api_Request";
import { useToast } from "@chakra-ui/react";

export default function IsPingable(props: {
    client: Client,
    onSuccess: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onError: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onLoading: React.ReactNode
}) {
    const query_key = ["mdx", "ping"];
    const query = useQuery<boolean, Error>(query_key, () => {
        return Api_Request.ping(props.client);
    }, {
        staleTime : 0,
        refetchOnMount : false
    });
    const toast = useToast({
        "duration" : 9000,
        "position" : "bottom-right"
    });
    const context = React.createContext(query);
    if (query.isSuccess == true) {
        if (query.data == true) {
            return (
                <context.Consumer>
                    {
                        props.onSuccess
                    }
                </context.Consumer>
            );
        } else {
            return (
                <context.Consumer>
                    {
                        props.onError
                    }
                </context.Consumer>
            );
        }
    }
    if (query.isLoading == true) {
        toast({
            "title" : "Pinging the Mangadex API",
            "status" : "loading",
            isClosable : true
        });
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        );
    }
    if (query.isRefetching == true) {
        toast({
            "title" : "Pinging the Mangadex API",
            "status" : "loading",
            isClosable : true
        });
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        );
    }
    
    if (query.isError == true) {
        return (
            <context.Consumer>
                {
                    props.onError
                }
            </context.Consumer>
        );
    }
    return (
        <React.Fragment>
            {
                props.onLoading
            }
        </React.Fragment>
    );
}