import { Collection } from "@mangadex/api/structures/Collection";
import React from "react";


export function useAggregateCollection<T>(collections: Collection<T>[]): T[] {
    return React.useMemo(() => {
        const data: T[] = [];
        collections.forEach((collection) => {
            data.push(...collection.get_data());
            return;
        });
        return data;
    }, [collections]);
}
