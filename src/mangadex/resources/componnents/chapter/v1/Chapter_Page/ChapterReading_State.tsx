import { Box, Center } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterPages from "./useChapterPages";
import React from "react";

export default function ChapterReading_State(props : {
    chapter : Chapter
}){
    const { query } = useChapterPages(props);
    if(query.isSuccess){
        return (
            <Box>
                <Center>
                    {query.data.current + 1} / {query.data.limit}
                </Center>
            </Box>
        );
    }
    return (
        <React.Fragment/>
    );
}