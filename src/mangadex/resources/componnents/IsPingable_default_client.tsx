import React from "react";
import { UseQueryResult } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import IsPingable from "./IsPingable";
import IsPingable_defaultError from "./IsPingable_defaultError";


export default function IsPingable_default_client(props : {
    onSuccess: (query: UseQueryResult<boolean, Error>) => React.ReactNode,
    onLoading: React.ReactNode
}){
    const client = useHTTPClient();
    return (
        <IsPingable
            onError={(query) => (
                <IsPingable_defaultError
                    query={query}
                />
            )}
            onSuccess={props.onSuccess}
            client={client}
            onLoading={props.onLoading}
        />
    );
}