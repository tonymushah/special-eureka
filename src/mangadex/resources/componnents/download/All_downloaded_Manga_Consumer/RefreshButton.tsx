import { Button } from "@chakra-ui/react";
import Collection from "@mangadex/api/structures/Collection";
import { QueryKey, UseInfiniteQueryOptions, useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

export default function RefreshButton({ query_key, query_options }: {
    query_key: QueryKey,
    query_options?: Omit<
        UseInfiniteQueryOptions<
            Collection<string>,
            unknown
        >,
        "queryKey"
    >
}) {
    const query = useInfiniteQuery<Collection<string>, unknown>(query_key, {
        enabled : false
    });
    //const query = useQuery(, query_options);
    return (
        <Button
            isLoading={query.isFetching}
            spinner={<BeatLoader size={8} />}
            onClick={() => {
                if (!query.isFetching) query.refetch();
            }}
        >
            Refresh
        </Button>
    );
}