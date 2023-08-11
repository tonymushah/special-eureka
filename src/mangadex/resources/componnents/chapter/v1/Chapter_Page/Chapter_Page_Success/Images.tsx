import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import React from "react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

export default function Images() {
    const client = useHTTPClient();
    const { chapter } = usePropsChapter();
    const chapter_data_images_queryKey = ["mdx", "chapter", chapter.get_id(), "data"];
    const chapter_data_images_query = useQuery<Array<string>, Error>(chapter_data_images_queryKey, () => {
        return chapter.get_dataImages(client);
    }, {
        staleTime: Infinity,
        enabled: !!chapter
    });
    if (chapter_data_images_query.isLoading || chapter_data_images_query.isPaused) {
        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Box>
                    <MangadexSpinner
                        color={"orange"}
                        thickness={"2px"}
                    />
                    <br />
                    <Chakra.Text>Loading...</Chakra.Text>
                </Chakra.Box>
            </Chakra.AbsoluteCenter>
        );
    }else if (chapter_data_images_query.isSuccess){
        return (
            <Outlet context={{
                    images: chapter_data_images_query.data,
                    chapter
                }} />
        );
    }else if (chapter_data_images_query.isError){
        return (
            <ErrorEL1 error={chapter_data_images_query.error} />
        );
    }else{
        return (
            <React.Fragment/>
        );
    }
}