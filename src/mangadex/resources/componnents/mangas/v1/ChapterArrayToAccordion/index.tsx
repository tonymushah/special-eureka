import * as Chakra from "@chakra-ui/react";
import { get_MangaChapter_Accordions_byChapterArray } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import React from "react";

const MangaChapterAccordion_Element = React.lazy(() => import("../MangaChapterAccordion_Element"));

export default function ChapterArrayToAccordion({ value, fallback = <div>Loading...</div> }: {
    value: Array<Chapter>,
    fallback?: React.ReactNode
}) {
    const data = React.useMemo(() => get_MangaChapter_Accordions_byChapterArray(value), [value]);
    return (
        <React.Suspense
            fallback={fallback}
        >
            <Chakra.VStack display={"block"} spacing={2} divider={<Chakra.StackDivider/>}> 
                {data.map(value2 => (
                    <React.Suspense
                        fallback={<MangaFallback2 />}
                        key={`${value2.$mangaid}-${JSON.stringify(value2.$chapters)}`}
                    >
                        <MangaChapterAccordion_Element src={value2} />
                    </React.Suspense>
                ))}
            </Chakra.VStack>
        </React.Suspense>
    );
}