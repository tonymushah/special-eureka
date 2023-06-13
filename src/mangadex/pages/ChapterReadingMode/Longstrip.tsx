import * as Chakra from "@chakra-ui/react";
import { useFullScreenOptions_Query } from "../chapter/ChapterFullScreen/FullScreenOptionsProvider";
import { ChapterPage_outlet_context } from "../chapter/UseChapterOutletContext";
import useChapterPages from "../chapter/useChapterPages";

export default function Lonstrip({ data } : {
    data : ChapterPage_outlet_context
}) {
    const fullScreenOptions = useFullScreenOptions_Query();
    const reading_state = useChapterPages({
        chapter : data.chapter
    });
    return (
            <Chakra.VStack>
                {
                    data.images.map((value, index) => (
                        <Chakra.Image
                            key={index}
                            onMouseOver={() => {
                                reading_state.setCurrentPage(index + 1);
                            }}
                            fallback={
                                <Chakra.Box width={"full"}>
                                    <Chakra.Center>
                                        <Chakra.Spinner
                                            size={"xl"}
                                            color={"orange"}
                                            thickness={"10px"}
                                        />
                                    </Chakra.Center>
                                </Chakra.Box>
                            }
                            width={fullScreenOptions.query.data != undefined? (fullScreenOptions.query.data.image_width != 0 ? `${fullScreenOptions.query.data.image_width}%` : "initial") : "initial"}
                            src={value}
                            id={`mdx-chapter-${data.chapter.get_id()}-${index+1}`}
                        />
                    ))
                }
            </Chakra.VStack>
    );
}