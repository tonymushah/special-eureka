import { UseQueryResult } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import usePingQuery from "../hooks/Ping";


export default function IsPingable(props: {
    client: Client,
    onSuccess: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onError: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onLoading: React.ReactNode
}) {
    const { query } = usePingQuery({
        client: props.client
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
    } else if (query.isLoading == true) {
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        );
    } else if (query.isError == true) {
        return (
            <context.Consumer>
                {
                    props.onError
                }
            </context.Consumer>
        );
    } else {
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        );
    }

}