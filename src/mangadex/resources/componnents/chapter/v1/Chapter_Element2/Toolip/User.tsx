import { Link } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { get_chapter_user_uploader } from "@mangadex/resources/hooks/ChapterStateHooks";
import { FaUser } from "react-icons/fa";
import { usePropsChapter } from "../../PropsContext";
import { useMangaDexPath } from "@mangadex/index";
export default function User() {
    const { chapter } = usePropsChapter();
    const { user_query } = get_chapter_user_uploader({
        chapter
    });
    const MangaDexPath = useMangaDexPath();
    return (
        <Chakra.Text margin={0} padding={0} noOfLines={0}>
            <Chakra.Icon as={FaUser} /> {
                user_query.isLoading ? <Chakra.Skeleton height={"20px"} /> : (
                    user_query.isError ? <ErrorEL1 error={user_query.error} /> : (
                        user_query.isSuccess ? <Chakra.Link key={user_query.data.get_id()} as={Link} to={MangaDexPath + `/user/${user_query.data.get_id()}`}>{user_query.data.get_username()}</Chakra.Link> : null
                    )
                )
            }
        </Chakra.Text>
    );
}