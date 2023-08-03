import { UseQueryResult } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import usePingQuery from "../hooks/Ping";
import { globalShortcut } from "@tauri-apps/api";


export default function IsPingable(props: {
    client: Client,
    onSuccess: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onError: (query: UseQueryResult<boolean, Error>) => React.ReactNode
    onLoading: React.ReactNode
}) {
    const { query } = usePingQuery({
        client: props.client
    });
    const register = React.useCallback(async () => {
        if(await globalShortcut.isRegistered("F5")){
            await globalShortcut.unregister("F5");
        }
        await globalShortcut.register("F5", () => {
            query.refetch();
        });
    }, []);
    const unregister = React.useCallback(async () => {
        await globalShortcut.unregister("F5");
    }, []);
    React.useEffect(() => {
        register();
        return () => {
            unregister();
        };
    }, []);
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