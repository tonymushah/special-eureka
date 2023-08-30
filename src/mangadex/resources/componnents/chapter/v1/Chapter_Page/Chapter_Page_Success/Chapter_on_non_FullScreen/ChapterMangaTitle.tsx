import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import { getMangaByID__ } from "../Chapter_on_non_FullScreen";

import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMangaDexPath } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import React from "react";

export default function ChapterMangaTitle() {
    const { chapter } = usePropsChapter();
    const mangaQuery = getMangaByID__({
        manga_id: chapter.get_manga_id(),
        options: {
            staleTime: Infinity,
            enabled: !!chapter
        }
    });
    const MangaDexPath = useMangaDexPath();
    if (mangaQuery.isSuccess) {
        return (
            <Chakra.Link
                as={Link}
                to={MangaDexPath + "/manga/" + mangaQuery.data?.manga.get_id()}
            >
                <MangaTitle src={mangaQuery.data.manga} />
            </Chakra.Link>
        );
    } else if (mangaQuery.isLoading) {
        return (
            <Chakra.Skeleton
                height={10}
            />
        );
    } else if (mangaQuery.isError) {
        return (
            <ErrorEL1 error={mangaQuery.error} />
        );
    } else {
        return (<React.Fragment />);
    }
}