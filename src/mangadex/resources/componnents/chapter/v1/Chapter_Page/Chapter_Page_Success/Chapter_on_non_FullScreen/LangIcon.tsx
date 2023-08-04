import { Lang } from "@mangadex/api/internal/Utils";
import Flag_icons from "@mangadex/resources/componnents/FlagIcons";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";
import { Await } from "react-router-dom";

export default function LangIcon() {
    const { chapter } = usePropsChapter();
    return (
        <React.Suspense>
            <Await
                resolve={chapter.get_translated_Lang()}
            >
                {
                    (getted: Lang) => (
                        <Flag_icons
                            locale={getted.get_flag_icon()}
                        />
                    )
                }
            </Await>
        </React.Suspense>
    );
}