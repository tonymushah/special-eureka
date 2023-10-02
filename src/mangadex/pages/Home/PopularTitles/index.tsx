import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { formatDate, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Asc_Desc } from "@mangadex/api/internal/Utils";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import "swiper/css/bundle";
import { Client } from "@tauri-apps/api/http";
import Collection from "@mangadex/api/structures/Collection";
import { OnSuccess } from "./OnSuccess";
import { OnLoading } from "./OnLoading";

export async function loader({
    client
}: {
    client?: Client
}) {
    const offset_limits = new Offset_limits();
    offset_limits.set_limits(10);
    const order = new Order();
    order.set_followedCount(Asc_Desc.desc());
    const touse_date_ = new Date();
    touse_date_.setMonth(touse_date_.getMonth() - 1);
    const touse_date = formatDate(touse_date_);
    return await Manga_with_allRelationship.search({
        offset_Limits: offset_limits,
        order: order,
        client,
        createdAtSince: touse_date,
        hasAvailableChapters: true
    });
}

export const queryKey = () => ["mdx", "popular-recent-titles"];

const context = React.createContext<UseQueryResult<Collection<Manga_with_allRelationship>> | undefined>(undefined);

export function useHomeRecentlyPopular() {
    const data = React.useContext(context);
    if (data) {
        return data;
    } else {
        throw new Error("The Home Popular Titles Provider is not defined! Somehow...");
    }
}

export function HomeRecentlyPopularProvider({ query, children }: React.PropsWithChildren<{
    query: UseQueryResult<Collection<Manga_with_allRelationship>>
}>) {
    return (
        <context.Provider value={query}>
            {
                children
            }
        </context.Provider>
    );
}

export default function RecentlyPopular() {
    const client = useHTTPClient();
    const key = React.useMemo(() => queryKey(), []);
    const query = useQuery(key, () => {
        return loader({ client });
    }, {
        staleTime: Infinity
    });
    if (query.isSuccess) {
        return (
            <HomeRecentlyPopularProvider query={query}>
                <OnSuccess />
            </HomeRecentlyPopularProvider>
        );
    } else {
        return (
            <HomeRecentlyPopularProvider query={query}>
                <OnLoading />
            </HomeRecentlyPopularProvider>
        );
    }
}