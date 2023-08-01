import React from "react";
import { usePropsChapter } from "../PropsContext";
import { Link as ReactRouterLink } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import { Link } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";

function TitleError() {
    const { chapter } = usePropsChapter();
    return (
        <React.Fragment>
            Chapter {chapter.get_chapter()} {
                chapter.get_title() == null || chapter.get_title() == undefined || chapter.get_title() == "" ? (<React.Fragment />) : (<React.Fragment> - {chapter.get_title()}</React.Fragment>)
            }</React.Fragment>
    );
}

export default function Title() {
    const MangaDexPath = React.useMemo(() => getMangaDexPath(), []);
    const { chapter } = usePropsChapter();
    return (
        <TryCatch
            catch={TitleError}
        >
            <Link
                as={ReactRouterLink}
                to={MangaDexPath + "/chapter/" + chapter.get_id()}
            >
                Chapter {chapter.get_chapter()} {
                    chapter.get_title() == null || chapter.get_title() == undefined || chapter.get_title() == "" ? (<React.Fragment />) : (<React.Fragment> - {chapter.get_title()}</React.Fragment>)
                }
            </Link>
        </TryCatch>
    );
}