import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useMangaDexPath } from "@mangadex/index";
import { FiRefreshCw } from "react-icons/fi";
import { useHomeLatest_Updates } from ".";

export function Title() {
    const MangaDexPath = useMangaDexPath();
    const headingColor = Chakra.useColorModeValue("black", "white");
    const query = useHomeLatest_Updates();
    return (
        <Chakra.HStack m={2}>
            <Chakra.Link as={Link} to={`${MangaDexPath}/titles/latest-updates`} color={headingColor} textDecoration={"none"} _hover={{
                color: "orange.500",
                textDecoration: "underline"
            }}>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
            </Chakra.Link>
            <Chakra.IconButton
                variant={"outline"}
                colorScheme={"orange"}
                onClick={() => query.refetch()}
                isLoading={query.isLoading || query.isRefetching}
                aria-label="Refresh"
                icon={<FiRefreshCw />} />
        </Chakra.HStack>
    );
}
