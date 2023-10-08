import { get_manga_of_chapter } from "@mangadex/resources/hooks/ChapterStateHooks";
import { useReadingDraweContext } from "..";
import { HStack, Icon, Link as ChakraLink, Skeleton } from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useMangaDexPath } from "@mangadex/index";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";

export default function ChapterMangaTitle(){
    const chapter = useReadingDraweContext();
    const { query } = get_manga_of_chapter({
        chapter
    });
    const mangadexPath = useMangaDexPath();
    if(query.isSuccess){
        return(
            <HStack>
                <Icon as={FiBook}/>
                <ChakraLink as={Link} to={`${mangadexPath}/manga/${query.data.get_id()}`}>
                    <MangaTitle src={query.data}/>
                </ChakraLink>
            </HStack>
        );
    }else{
        return (
            <Skeleton
                height={"1"}
                width={"full"}
            />
        );
    }
}