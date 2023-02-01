import { Client } from "@tauri-apps/api/http";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

const HTTPClientProvider = React.lazy(() => import("./HTTPClientProvider"));

export default function HTTPClientProvider_Query(props: React.PropsWithChildren<{
    value: Promise<Client>,
    onLoading: React.ReactNode,
    onError: (error: Error) => React.ReactNode
}>) {
    const queryKey = "tauri-http_client";
    const query = useQuery<Client, Error>(queryKey, () => {
        return props.value
    }, {
        staleTime: Infinity,
        cacheTime: 0,
        retry(failureCount, error) {
            if (failureCount >= 3) {
                return false;
            } else {
                return true;
            }
        }
    })
    if (query.isSuccess == true) {
        if (props.children == undefined) {
            return (<></>)
        } else {
            return (
                <React.Suspense
                    fallback={
                        <>
                            {props.onLoading}
                        </>
                    }
                >
                <HTTPClientProvider
                    value={query.data}
                >
                    {
                        props.children
                    }
                </HTTPClientProvider>
                </React.Suspense>
            );
        }
    }
    if (query.isError == true) {
        const context = React.createContext(query.error);
        return (
            <context.Consumer>
                {
                    props.onError
                }
            </context.Consumer>
        )
    }
    return (
        <>
            {
                props.onLoading
            }
        </>
    );
}