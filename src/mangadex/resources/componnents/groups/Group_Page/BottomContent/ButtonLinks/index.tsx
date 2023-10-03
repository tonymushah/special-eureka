import { ButtonGroup } from "@chakra-ui/react";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import ToGroupDetailsButton from "./Buttons/GroupDetails";
import ToTitlesButton from "./Buttons/Tiltes";
import ToFeedButton from "./Buttons/Feed";

export default function ButtonLinks(){
    return (
        <ChakraContainer>
            <ButtonGroup colorScheme="orange">
                <ToGroupDetailsButton/>
                <ToTitlesButton/>
                <ToFeedButton/>
            </ButtonGroup>
        </ChakraContainer>
    );
}