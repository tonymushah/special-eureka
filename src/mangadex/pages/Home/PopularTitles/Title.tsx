import * as Chakra from "@chakra-ui/react";
import { useMangaDexPath } from "@mangadex/index";
import { FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useHomeRecentlyPopular } from ".";

export default function Title() {
    const MangaDexPath = useMangaDexPath();
    const headingColor = Chakra.useColorModeValue("black", "white");
    const query = useHomeRecentlyPopular();
    return (
        <Chakra.HStack m={2}>
            <Chakra.Link as={Link} to={`${MangaDexPath}/titles/recently-popular`} color={headingColor} textDecoration={"none"} _hover={{
                color: "orange.500",
                textDecoration: "underline"
            }}>
                <Chakra.Heading fontFamily={"inherit"}>Recently Popular Title</Chakra.Heading>
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