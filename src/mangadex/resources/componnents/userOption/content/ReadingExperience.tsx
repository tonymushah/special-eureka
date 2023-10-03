import React from "react";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import Chapter_Reading_mode from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/ChapterReadingMode";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/SelectLanguages"));

export default function ReadingExperience() {
    return (
        <Chakra.TabPanel>
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
            <Chakra.HStack>
                <Chakra.Text>Chapter Reading Mode : </Chakra.Text>
                <Chapter_Reading_mode/>
            </Chakra.HStack>
        </Chakra.TabPanel>
    );
}

export function ReadingExperienceTab() {
    return (
        <Chakra.Tab>
            <Chakra.HStack>
                <Chakra.Icon as={FiBook} />
                <Chakra.Text>
                    Reading Experience
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Tab>
    );
}