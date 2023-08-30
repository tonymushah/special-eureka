import { useMangaDexPath } from "@mangadex/index";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import { get_chapter_groups } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_groups";
import React from "react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Groups() {
    const { chapter } = usePropsChapter();
    const chapter_groups = get_chapter_groups({
        chapter: chapter
    });
    const MangaDexPath = useMangaDexPath();
    return (
        <React.Fragment>
            {
                chapter_groups.map((query, index) => (
                    <React.Fragment key={`mdx-chapter-success-${chapter.get_id()}-${index}`}>
                        {
                            query.isSuccess ? (
                                <ChakraLink as={Link} to={`${MangaDexPath}/group/${query.data.get_id()}`}>
                                    {
                                        query.data.get_name()
                                    }
                                </ChakraLink>
                            ) : (
                                <React.Fragment/>
                            )
                        }
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    );
}