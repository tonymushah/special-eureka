import * as Chakra from "@chakra-ui/react";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import ChaptersButton from "./Buttons/Chapters";
import CoverButton from "./Buttons/Covers";
import RelatedButtoWithCondition from "./RelatedIsShowed";

export default function ButtonsNavigation() {
    return (
        <Chakra.Box>
            <ChakraContainer>
                <Chakra.HStack>
                </Chakra.HStack>
                <Chakra.ButtonGroup isAttached variant={"outline"} colorScheme="orange">
                    <ChaptersButton/>
                    <CoverButton/>
                    <RelatedButtoWithCondition/>
                </Chakra.ButtonGroup>
            </ChakraContainer>
        </Chakra.Box>
);
}