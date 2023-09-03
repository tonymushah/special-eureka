import * as Chakra from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import React from "react";
import { useManga } from "@mangadex/pages/manga";

export function Demographics() {
    const { toUse: src } = useManga();
    const demographics = React.useMemo(() => src.get_demographic(), [src]);
    const gray500 = Chakra.useToken("colors", "gray.500");
    return (
        <Chakra.WrapItem>
            {demographics != null ? (
                <Chakra.Box>
                    <Chakra.Heading fontFamily={"inherit"} size={"md"}>Demographics</Chakra.Heading>
                    <Chakra.Wrap>
                        <Chakra.WrapItem>
                            <Chakra.Button
                                style={{
                                    fontWeight: "800"
                                }}
                                boxShadow={`0px 0px 5px ${gray500}`}
                                variant={"solid"} 
                                colorScheme={"gray"} 
                                size="sm"
                            >
                                {make_first_UpperCare(demographics)}
                            </Chakra.Button>
                        </Chakra.WrapItem>
                    </Chakra.Wrap>
                </Chakra.Box>
            ) : (
                <React.Fragment />
            )}
        </Chakra.WrapItem>
    );
}
