import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Chapter } from "../../../api/structures/Chapter";
import ErrorEL1 from "../error/ErrorEL1";
import Chapter_Element1_byChapID from "../chapter/v1/Chapter_Element1_byChapID";

export default function All_downloaded_chapter() {
    const [mode, setMode] = React.useState<"line" | "box">("line");
    const query_key = "mdx-downloaded_chapter";
    const query = useQuery(query_key, () => {
        return Chapter.getAll_downloaded_chap();
    }, {
        staleTime: Infinity
    });
    if (query.isLoading) {
        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Box>
                    <Chakra.Spinner
                        color={"orange"}
                        thickness={"10px"}
                        size={"xl"}
                    />
                </Chakra.Box>
            </Chakra.AbsoluteCenter>
        )
    }
    if (query.isError) {
        return (
            <Chakra.Box>
                <ErrorEL1 error={query.error} />
            </Chakra.Box>
        )
    }
    return (
        <Chakra.Box>
            <Chakra.VStack>
                {
                    query.data?.map((value) => (
                        <Chapter_Element1_byChapID id={value} />
                    ))
                }
            </Chakra.VStack>
        </Chakra.Box>
    );
}
