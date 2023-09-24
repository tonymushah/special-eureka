import * as Chakra from "@chakra-ui/react";
import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import React from "react";
import { Await } from "react-router-dom";
import MangadexSpinner from "../../../../kuru_kuru/MangadexSpinner";
import { useManga } from "@mangadex/pages/manga";

export function AltTitles() {
    const { toUse: src } = useManga();
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"} size={"md"}>Atlernative Titles</Chakra.Heading>
            <React.Suspense fallback={<MangadexSpinner />}>
                <Await
                    resolve={Lang_and_Data.initializeArrayByAltTitle_obj(src.get_alt_title())}
                    errorElement={<React.Fragment> </React.Fragment>}
                >
                    {(getted: Array<Lang_and_Data>) => {
                        return (
                            <React.Fragment>
                                {getted.map((element) => (
                                    <Chakra.HStack key={element.get_data()}>
                                        <Chakra.Tooltip
                                            hasArrow
                                            label={element.get_language().get_name()}
                                        >
                                            <span className={"fi fi-" + element.get_language().get_flag_icon().toLowerCase()}></span>
                                        </Chakra.Tooltip>
                                        &nbsp;
                                        <Chakra.Text>
                                            {element.get_data()}
                                        </Chakra.Text>
                                    </Chakra.HStack>
                                ))}
                            </React.Fragment>
                        );
                    }}
                </Await>
            </React.Suspense>
        </Chakra.Box>
    );
}
