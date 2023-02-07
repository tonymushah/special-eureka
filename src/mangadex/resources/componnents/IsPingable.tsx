import { useQuery, UseQueryResult } from "react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { Api_Request } from "../../api/internal/Api_Request";

export default function IsPingable(props: {
    client: Client,
    onSuccess: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onError: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onLoading: React.ReactNode
}) {
    const query_key = "mdx-ping";
    const query = useQuery<boolean, Error>(query_key, () => {
        return Api_Request.ping(props.client);
    }, {
        refetchOnWindowFocus : true,
        refetchOnMount: false
    });
    const context = React.createContext(query)
    if (query.isLoading == true) {
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        )
    }
    if (query.isRefetching == true) {
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        )
    }
    if (query.isSuccess == true) {
        if (query.data == true) {
            return (
                <context.Consumer>
                    {
                        props.onSuccess
                    }
                </context.Consumer>
            )
        } else {
            return (
                <context.Consumer>
                    {
                        props.onError
                    }
                </context.Consumer>
            )
        }

    }
    if (query.isError == true) {
        return (
            <context.Consumer>
                {
                    props.onError
                }
            </context.Consumer>
        )
    }
    return (
        <React.Fragment>
            {
                props.onLoading
            }
        </React.Fragment>
    )
}