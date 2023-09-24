import * as Chakra from "@chakra-ui/react";
import MangaStatus from "@mangadex/api/enums/MangaStatus";
import React from "react";
import { useManga } from "@mangadex/pages/manga";




export function LatestChapter() {
    const { toUse: src } = useManga();
    const status = React.useMemo(() => src.get_status_enum(), [src]);
    const last_volume = React.useMemo(() => src.get_last_volume(), [src]);
    const last_chapter = React.useMemo(() => src.get_last_chapter(), [src]);
    return (
        <Chakra.Box>
            {status == MangaStatus.completed ? (
                <React.Fragment>
                    <Chakra.Text fontWeight={"bold"}>Latest Chapter : Volume {last_volume ?? "none"} Chapter {last_chapter ?? "none"}
                    </Chakra.Text>
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
        </Chakra.Box>
    );
}
