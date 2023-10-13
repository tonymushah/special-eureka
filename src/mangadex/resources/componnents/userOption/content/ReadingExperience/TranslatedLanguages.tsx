import React from "react";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/SelectLanguages"));

export function TranslatedLanguages() {
    return (
        <Chakra.Box width={"full"}>
            <Chakra.Text as={"span"}>Translated Languages : <Chakra.Tooltip
                label={"It's applies for chapters list only"}
            >
                <ChakraIcons.QuestionIcon />
            </Chakra.Tooltip></Chakra.Text>
            <React.Suspense
                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
            >
                <SelectLanguages />
            </React.Suspense>
        </Chakra.Box>
    );
}
