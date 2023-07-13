import React from "react";
import { usePropsChapter } from "../PropsContext";
import { Skeleton } from "@chakra-ui/react";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import UserLink from "@mangadex/resources/componnents/user/UserLink";
import { get_chapter_user_uploader } from "@mangadex/resources/hooks/ChapterStateHooks";

export default function User() {
    const { chapter } = usePropsChapter();
    const { user_query } = get_chapter_user_uploader({
        chapter
    });
    return (
        <React.Fragment>
            {
                user_query.isLoading ? <Skeleton height={"20px"} /> : (
                    user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                        user_query.isSuccess ? (<UserLink user={user_query.data} />) : (<React.Fragment />)
                    )
                )
            }
        </React.Fragment>
    );
}