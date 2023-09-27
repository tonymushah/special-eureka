import { Box, Image } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import React from "react";
import ChapterImage from "../Image";
import { useSinglePageReadingHooks } from "./hooks";

export default function ActualPage({ data }: {
    data: ChapterPage_outlet_context,
    startPage? : number
}) {
    const { page, onNext, onPrevious } = useSinglePageReadingHooks({ data });
    return (
        <React.Fragment>
            {data.images.map((url, index) => {
                if (page == index) {
                    return (
                        <Box
                            key={url}
                        >
                            <ChapterImage
                                src={url}
                                onNext={onNext}
                                onPrevious={onPrevious}
                            />
                        </Box>
                    );
                } else {
                    return (
                        <Image
                            key={url}
                            alt={url}
                            src={url}
                            display={"none"}
                        />
                    );
                }
            })}
        </React.Fragment>
    );
}