import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import { getMangaByID__ } from "../Chapter_on_non_FullScreen";
import * as Chakra from "@chakra-ui/react";
import { Link } from "@router";
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
    if (mangaQuery.isSuccess) {
        return (
            <React.Fragment>
                <Link
                    to={"/mangadex/manga/:id"}
                    params={{
                        id: chapter.get_manga_id()
                    }}
                >
                    <MangaTitle src={mangaQuery.data} />
                </Link>
            </React.Fragment>
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