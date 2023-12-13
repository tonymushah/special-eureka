import { toggleFullscreen, eventName } from "@commons-res/components/FullscreenF11";
import { MutationKey, useMutation, useQuery } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";

export function useChapterFullscreen() {
    // [x] Refactor into a function
    const queryKey_: readonly string[] = React.useMemo(() => queryKey(), []);
    const query = useQuery(queryKey_, {
        "initialData": false,
        queryFn: async () => {
            return await appWindow.isFullscreen();
        },
    });
    React.useEffect(() => {
        const getted = appWindow.listen(eventName, () => {
            query.refetch();
        });
        return () => {
            getted.then((d) => d());
        };
    }, [query]);
    const mutationKey: MutationKey = queryKey_.concat("mutation");
    const update_mutation = useMutation({
        mutationFn: async (_value: boolean) => {
            await toggleFullscreen(_value);
            query.refetch();
        },
        mutationKey: mutationKey
    });
    return {
        queryKey: queryKey_,
        query,
        update_mutation,
        update: update_mutation.mutate,
        toggle: () => {
            if (query.data != undefined) {
                update_mutation.mutate(!(query.data));
            }
        }
    };
}

export function queryKey(): readonly string[] {
    return ["mdx", "chapter", "fullscreen-mode"];
}

