import { Center, HStack, Box, Text } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";
import { useInView } from "react-intersection-observer";

export default function NextTrigger({ query }: {
    query: UseInfiniteQueryResult<unknown, unknown>;
}) {
    const [, startTransition] = React.useTransition();
    const { ref } = useInView({
        onChange(inView) {
            startTransition(() => {
                if (inView && query.hasNextPage == true && !query.isFetchingNextPage && !query.isLoading) {
                    query.fetchNextPage();
                }
            });
        },
    });
    if (query.hasNextPage == true) {
        return (
            <Center ref={ref}>
                <Box>
                    {query.isFetchingNextPage ? (
                        <HStack>
                            <MangadexSpinner />
                            <Text as={"span"}>
                                Loading...
                            </Text>
                        </HStack>
                    ) : (
                        <React.Fragment>
                            Next...
                        </React.Fragment>
                    )}
                </Box>
            </Center>
        );
    } else {
        return (<React.Fragment />);
    }
}