import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useChapterPageOutletContext } from "../Chapter_Page";

export default function Lonstrip() {
    let data = useChapterPageOutletContext()
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
                            src={value}
                        />

                    ))
                }
            </Chakra.VStack>
    )
}