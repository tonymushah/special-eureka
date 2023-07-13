import React from "react";
import { v4 } from "uuid";
import MangaTags from "../../../tags";
import { useProps } from "../../MangaElementDef/vanilla";
import * as Chakra from "@chakra-ui/react";

export default function Tags() {
    const { src } = useProps();
    return (
        <Chakra.Box noOfLines={1}>
            <MangaTags src={src}>
                {
                    (nodes) => (
                        <Chakra.Wrap margin={0} spacing={"2px"} marginBottom={0}>
                            {
                                nodes.map((value, index, array) => (
                                    <React.Fragment key={`${v4()}`}>
                                        {
                                            index < 10 ? (
                                                <Chakra.WrapItem >
                                                    {
                                                        value
                                                    }
                                                </Chakra.WrapItem>
                                            ) : (
                                                index == 10 ? (
                                                    <Chakra.Tag>{array.length - index} more...</Chakra.Tag>
                                                ) : (
                                                    <React.Fragment />
                                                )
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Chakra.Wrap>
                    )
                }
            </MangaTags>
        </Chakra.Box>
    );
}