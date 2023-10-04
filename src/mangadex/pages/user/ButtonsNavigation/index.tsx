import * as Chakra from "@chakra-ui/react";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import FeedButton from "./Buttons/Feed";
import InfoButton from "./Buttons/Info";

export default function ButtonsNavigation() {
    return (
        <Chakra.Box>
            <ChakraContainer>
                <Chakra.ButtonGroup isAttached variant={"outline"} colorScheme="orange">
                    <InfoButton />
                    <FeedButton />
                </Chakra.ButtonGroup>
            </ChakraContainer>
        </Chakra.Box>
    );
}