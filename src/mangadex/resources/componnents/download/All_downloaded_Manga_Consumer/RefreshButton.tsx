import { Button } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

export default function RefreshButton({ query_key, query_options }: {
    query_key: QueryKey,
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, "queryKey" | "queryFn">
}) {
    const client = useHTTPClient();
    const query = useQuery(query_key, () => {
        return Manga.getAllDownloadedMangaID(undefined, client);
    }, query_options);
    return (
        <Button
            isLoading={query.isFetching}
            spinner={<BeatLoader size={8} />}
            onClick={() => {
                if (!query.isFetching) query.refetch();
            }}
        >Refresh
        </Button>
    );
}