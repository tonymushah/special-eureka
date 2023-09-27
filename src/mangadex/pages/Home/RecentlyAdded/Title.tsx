import * as Chakra from "@chakra-ui/react";
import { useMangaDexPath } from "@mangadex/index";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { queryKey } from ".";

export function Title() {
    const key = React.useMemo(() => queryKey(), []);
    const MangaDexPath = useMangaDexPath();
    const headingColor = Chakra.useColorModeValue("black", "white");
    const query = useQuery(key, {
        enabled: false
    });
    return (
        <Chakra.HStack m={2}>
            <Chakra.Link as={Link} to={`${MangaDexPath}/titles/recently-added`} color={headingColor} textDecoration={"none"} _hover={{
                color: "orange.500",
                textDecoration: "underline"
            }}>
                <Chakra.Heading fontFamily={"inherit"}>Recently Added</Chakra.Heading>
            </Chakra.Link>
            <Chakra.IconButton
                colorScheme={"orange"}
                variant={"outline"}
                onClick={() => query.refetch()}
                isLoading={query.isLoading || query.isRefetching}
                aria-label="Refresh"
                icon={<FiRefreshCw />} />
        </Chakra.HStack>
    );
}
