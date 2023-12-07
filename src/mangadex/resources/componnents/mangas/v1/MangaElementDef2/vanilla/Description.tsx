import * as Chakra from "@chakra-ui/react";
import get_manga_description from "@mangadex/resources/hooks/MangaStateHooks/get_manga_description";
import { useProps } from "../../MangaElementDef/vanilla/Props";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import React from "react";

export default function Description() {
    const { src } = useProps();
    const {
        manga_description_query
    } = get_manga_description({
        src
    });
    if (manga_description_query.isSuccess) {
        if (manga_description_query.data.length == 0) {
            return (
                <React.Fragment />
            );
        } else {
            return (
                <Chakra.Text
                    noOfLines={3}
                    marginBottom={"1px"}
                    fontSize={"md"}
                >
                    {manga_description_query.data[0].get_data()}
                </Chakra.Text>
            );
        }
    } else if (manga_description_query.isLoading) {
        return (
            <Chakra.Skeleton
                height={"full"}
                width={"full"}
            />
        );
    } else if (manga_description_query.isError) {
        return (
            <ErrorEL1 error={manga_description_query.error} />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}