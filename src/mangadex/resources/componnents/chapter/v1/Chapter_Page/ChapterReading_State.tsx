import { Box, Center } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterPages from "./useChapterPages";

export default function ChapterReading_State(props : {
    chapter : Chapter
}){
    const { query } = useChapterPages(props);
    if(query.isSuccess){
        return (
            <Box>
                <Center>
                    {query.data.current} / {query.data.limit}
                </Center>
            </Box>
        );
    }
    return (
        <></>
    );
}