import * as Chakra from "@chakra-ui/react";
import Consumer from "@commons-res/components/Consumer";
import Collection from "@mangadex/api/structures/Collection";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";
import ChakraContainer from "../layout/Container";
import NextTrigger from "./NextTrigger";

export function InfiniteQueryConsumer<T>({
    query, children
}: {
    query: UseInfiniteQueryResult<Collection<T>, unknown>;
    children: (value: Collection<T>[]) => React.ReactNode;
}) {
    const [, startTransition] = React.useTransition();
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <Consumer<Collection<T>[]> to_consume={query.data.pages}>
                    {
                        children
                    }
                </Consumer>
                <NextTrigger query={query}/>
            </React.Fragment>
        );
    } else if (query.isError) {
        return (
            <Chakra.Alert status="error">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>
                    {typeof query.error == "object" && query.error instanceof Error ? (
                        <React.Fragment>
                            {query.error.message}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            Unknown Error
                        </React.Fragment>
                    )}
                </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <Chakra.Button onClick={() => {
                        startTransition(() => {
                            query.refetch();
                        });
                    }} isLoading={query.isFetching}>Refresh</Chakra.Button>
                </Chakra.AlertDescription>
            </Chakra.Alert>
        );
    } else {
        return (
            <ChakraContainer>
                <Chakra.Center>
                    <Chakra.Box>
                        <Chakra.HStack>
                            <MangadexSpinner />
                            <Chakra.Text as={"span"}>
                                Loading...
                            </Chakra.Text>
                        </Chakra.HStack>
                    </Chakra.Box>
                </Chakra.Center>
            </ChakraContainer>
        );
    }

}
