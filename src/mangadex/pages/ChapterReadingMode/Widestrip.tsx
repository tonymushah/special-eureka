import React from "react";
import * as Chakra from "@chakra-ui/react";
import useChapterPageOutletContext from "../chapter/UseChapterOutletContext";

export default function Widestrip() {
    let data = useChapterPageOutletContext()
    return (
            <Chakra.HStack>
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
                            src={value}
                        />
                    ))
                }
            </Chakra.HStack>
    )
}