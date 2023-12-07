import { Wrap, WrapItem } from "@chakra-ui/react";
import { v4 } from "uuid";
import MangaTags from "../../tags";
import { useProps } from "../../v1/MangaElementDef/vanilla/Props";

export default function Tags() {
    const { src } = useProps();
    return (
        <MangaTags src={src}>
            {
                (nodes) => (
                    <Wrap>
                        {
                            nodes.map((value) => (
                                <WrapItem key={`${v4()}`}>
                                    {
                                        value
                                    }
                                </WrapItem>
                            ))
                        }
                    </Wrap>
                )
            }
        </MangaTags>
    );
}