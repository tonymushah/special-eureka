import * as Chakra from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function Title({ queryKey }: {
    queryKey: string[];
}) {
    const query = useQuery(queryKey, {
        enabled: false
    });
    return (
        <Chakra.Heading
            fontFamily={"inherit"}
            onClick={() => {
                if (query.isSuccess) {
                    query.refetch();
                }
            }}
            _hover={{
                textDecoration: query.isLoading ? "none" : "overline"
            }}
        >
            Latest Updates
        </Chakra.Heading>
    );
}
