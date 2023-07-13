import { Client } from "@tauri-apps/api/http";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const HTTPClientProvider = React.lazy(() => import("./HTTPClientProvider"));

export default function HTTPClientProvider_Query(props: React.PropsWithChildren<{
    value: () => Promise<Client>,
    onLoading: React.ReactNode,
    onError: (error: Error) => React.ReactNode
}>) {
    const queryKey = ["tauri", "http_client"];
    const query = useQuery<Client, Error>(queryKey, props.value, {
        staleTime: Infinity
    });
    React.useEffect(() => {
        return () => {
            if(query.data != undefined){
                query.data.drop();
            }
        };
    }, []);
    if (query.isSuccess == true) {
        if (props.children == undefined) {
            return (<React.Fragment/>);
        } else {
            return (
                <React.Suspense
                    fallback={
                        <React.Fragment>
                            {props.onLoading}
                        </React.Fragment>
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