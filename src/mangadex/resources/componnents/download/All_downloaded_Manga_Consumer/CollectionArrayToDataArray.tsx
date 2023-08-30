import Consumer from "@commons-res/components/Consumer";
import { Collection } from "@mangadex/api/structures/Collection";
import React from "react";
import { useAggregateCollection } from "./useAggregateCollection";

export default function CollectionArrayToDataArray<T>({ data, children }: {
    data: Collection<T>[];
    children: (value: Array<T>) => React.ReactNode;
}) {
    const treated_data = useAggregateCollection<T>(data);
    return (
        <Consumer<T[]> to_consume={treated_data}>
            {children}
        </Consumer>
    );
}
