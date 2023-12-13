import * as Chakra from "@chakra-ui/react";
import { v4 } from "uuid";
import MangaTags from "../../../tags";
import { useProps } from "../../MangaElementDef/vanilla/Props";

export default function Tags() {
    const { src } = useProps();
    return (
        <Chakra.Box
            noOfLines={1}
            padding={0}
            margin={0}
        >
            <MangaTags src={src}>
                {
                    (nodes) => (
                        <Chakra.Wrap>
                            {
                                nodes.map((value) => (
                                    <Chakra.WrapItem key={`${v4()}`}>
                                        {
                                            value
                                        }
                                    </Chakra.WrapItem>
                                ))
                            }
                        </Chakra.Wrap>
                    )
                }
            </MangaTags>
        </Chakra.Box>
    );
}