import React from "react";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"));

export default function ChapterLanguages() {
    return (
        <Chakra.TabPanel>
            <Chakra.Box width={"full"}>
                <Chakra.Text as={"span"}>Translated Languages : <Chakra.Tooltip
                    label={"It's applies for chapters"}
                >
                    <ChakraIcons.QuestionIcon />
                </Chakra.Tooltip></Chakra.Text>
                <React.Suspense
                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                >
                    <SelectLanguages />
                </React.Suspense>
            </Chakra.Box>
        </Chakra.TabPanel>
    );
}

export function ChapterLanguagesTab() {
    return (
        <Chakra.Tab>
            <Chakra.HStack>
                <Chakra.Icon as={FiBook} />
                <Chakra.Text>
                    Chapter Languages
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Tab>
    );
}