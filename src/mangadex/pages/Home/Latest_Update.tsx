import * as Chakra from "@chakra-ui/react";
import React from 'react';
import { useQuery } from 'react-query';
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits, Order } from '../../api/internal/Utils';
import { Chapter, Chapter_withAllIncludes } from '../../api/structures/Chapter';
import { Collection } from '../../api/structures/Collection';
import ErrorEL1 from '../../resources/componnents/error/ErrorEL1';
import MangaElementFallback from "../../resources/componnents/mangas/v1/MangaElementFallback";

const MangaFeedElement = React.lazy(() => import('../../resources/componnents/chapter/v1/MangaFeedElement'));

export default function Latest_Updates() {
    const offset_limits_2: Offset_limits = new Offset_limits();
    offset_limits_2.set_limits(12);
    const client = useHTTPClient()
    const key = "mdx-home_page-latest_update";
    const query = useQuery<Collection<Chapter_withAllIncludes>, Error>(key, () => {
        return Chapter_withAllIncludes.search({
            offset_limits: offset_limits_2,
            order: new Order("desc"),
            client: client
        })
    }, {
        staleTime: Infinity
    })
    if (query.isLoading) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                >
                    Refetch
                </Chakra.Button>
                <Chakra.Box
                    marginTop={"25px"}
                    marginBottom={"25px"}
                >
                    <Chakra.Center>
                        <Chakra.Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.Center>
                </Chakra.Box>
            </Chakra.Box>
        )
    }
    if (query.isError) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={() => query.refetch()}
                >
                    Refetch
                </Chakra.Button>
                <ErrorEL1 error={query.error} />
            </Chakra.Box>
        )
    }
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"}>Latest Updates</Chakra.Heading>
            <Chakra.Button
                colorScheme={"orange"}
                onClick={() => query.refetch()}
            >
                Refetch
            </Chakra.Button>
            <Chakra.Wrap>
                {query.data!.get_data().map((value: Chapter) => (
                    <Chakra.WrapItem key={value.get_id()}>
                        <React.Suspense
                            fallback={
                                <MangaElementFallback />
                            }
                        >
                            <MangaFeedElement src={value} />
                        </React.Suspense>

                    </Chakra.WrapItem>
                ))}
            </Chakra.Wrap>

        </Chakra.Box>
    )
}
