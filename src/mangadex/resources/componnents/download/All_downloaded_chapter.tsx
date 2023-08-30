import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
import React from "react";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Collection } from "@mangadex/api/structures/Collection";
import Chapter_Element1_byChapID from "../chapter/v1/Chapter_Element1_byChapID";
import { CollectionComponnent_WithQuery } from "../Collection/Collection";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";

export default function All_downloaded_chapter(props: {
    query_options?: Omit<UseQueryOptions<Collection<string>, Error>, "queryKey" | "queryFn">,
}) {
    const client = useHTTPClient();
    const [isTransition, startTransition] = React.useTransition();
    const [include_fails, setInclude_fails] = React.useState(true);
    const [only_fails, setOnly_fails] = React.useState(false);
    const fn = React.useCallback(() => {
        return Chapter.getAll_downloaded_chap({
            include_fails,
            only_fails
        }, client);
    }, [include_fails, only_fails]);
    const query_key = React.useMemo<QueryKey>(() => 
        // refactor into a function
        ["mdx", "downloaded_chapter", { include_fails, only_fails }]
    , [include_fails, only_fails]);
    return (
        <Chakra.Box>
            <Chakra.Box>
                <Chakra.Heading size={"lg"} fontFamily={"Poppins"}>
                    Filters
                </Chakra.Heading>
                <Chakra.ButtonGroup>
                    <Chakra.Button
                        isLoading={isTransition}
                        leftIcon={include_fails ? <ChakraIcons.CheckIcon /> : <ChakraIcons.NotAllowedIcon />}
                        colorScheme={include_fails ? "orange" : "gray"}
                        isDisabled={only_fails}
                        onClick={() => startTransition(() => {
                            setInclude_fails(!include_fails);
                        })}
                    >
                        Include failed download
                    </Chakra.Button>
                    <Chakra.Button
                        isLoading={isTransition}
                        leftIcon={only_fails ? <ChakraIcons.CheckIcon /> : <ChakraIcons.NotAllowedIcon />}
                        colorScheme={only_fails ? "orange" : "gray"}
                        onClick={() => startTransition(() => {
                            setOnly_fails(!only_fails);
                            setInclude_fails(true);
                        })}
                    >Show only fail</Chakra.Button>
                </Chakra.ButtonGroup>

            </Chakra.Box>
            <CollectionComponnent_WithQuery<string>
                fn={fn}
                queryKey={query_key}
                onLoading={
                    <Chakra.AbsoluteCenter>
                        <Chakra.Box>
                            <MangadexSpinner
                                color={"orange"}
                                thickness={"10px"}
                                size={"xl"}
                            />
                        </Chakra.Box>
                    </Chakra.AbsoluteCenter>
                }
                query_options={props.query_options}
            >
                {
                    (value) => (<Chakra.VStack display={"block"}>
                        {
                            value.get_data().map((value) => (
                                <React.Suspense
                                    key={value}
                                    fallback={
                                        <Chakra.Box width={"full"}>
                                            <Chakra.Center>
                                                <MangadexSpinner />
                                            </Chakra.Center>
                                        </Chakra.Box>
                                    }
                                >
                                    <Chapter_Element1_byChapID id={value} />
                                </React.Suspense>
                            ))
                        }
                    </Chakra.VStack>
                    )
                }
            </CollectionComponnent_WithQuery>

        </Chakra.Box>
    );
}
