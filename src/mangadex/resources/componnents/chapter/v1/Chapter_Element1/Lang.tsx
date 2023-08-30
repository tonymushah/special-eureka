import React from "react";
import { usePropsChapter } from "../PropsContext";
import { Tooltip, Icon} from "@chakra-ui/react";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import { get_this_chapter_lang } from "@mangadex/resources/hooks/ChapterStateHooks/get_this_chapter_lang";
import { FaQuestionCircle } from "react-icons/fa";

export default function ChapterLang() {
    const { chapter } = usePropsChapter();
    const {
        this_chapter_lang_query
    } = get_this_chapter_lang({
        chapter
    });
    return (
        <React.Fragment>
            {
                this_chapter_lang_query.isSuccess ? (
                    <Tooltip
                        hasArrow
                        label={this_chapter_lang_query.data.get_name()}
                    >
                        <Flag_icons locale={this_chapter_lang_query.data.get_flag_icon().toLowerCase()} />
                    </Tooltip>
                ) : (
                    this_chapter_lang_query.isError ? (
                        <Tooltip
                            hasArrow
                            label={"Language not found"}
                        >
                            <Icon as={FaQuestionCircle} />
                        </Tooltip>
                    ) : (
                        <React.Fragment/>
                    )
                )
            }
        </React.Fragment>
    );
}