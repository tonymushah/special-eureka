import * as Chakra from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import { TranslatedLanguages } from "./TranslatedLanguages";
import { ReadingMode } from "./ReadingMode";

export default function ReadingExperience() {
    return (
        <Chakra.TabPanel>
            <TranslatedLanguages />
            <ReadingMode/>
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