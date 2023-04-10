import { EventCallback, listen } from "@tauri-apps/api/event";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function EventListener_<T = unknown>(props: React.PropsWithChildren<{
    event_id: string,
    callback_fn: EventCallback<T>
}>){
    const queryKey = ["special-eureka-event", {
        id: props.event_id
    }];
    const query = useQuery(queryKey, () => {
        return listen(props.event_id, props.callback_fn);
    }, {
        staleTime: Infinity
    });
    return {
        query,
        queryKey
    };
}