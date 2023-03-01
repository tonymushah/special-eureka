import React from "react";
import * as Chakra from "@chakra-ui/react";
import useChapterPageOutletContext from "../chapter/UseChapterOutletContext";
import { useFullScreenOptions, useFullScreenOptions_Query } from "../chapter/ChapterFullScreen/FullScreenOptionsProvider";

export default function Lonstrip() {
    const data = useChapterPageOutletContext()
    const fullScreenOptions = useFullScreenOptions_Query();
    return (
        
            <Chakra.VStack>
                {
                    data.images.map((value) => (

                        <Chakra.Image
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
                        />

                    ))
                }
            </Chakra.VStack>
    )
}