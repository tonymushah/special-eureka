import { Box, CardBody } from "@chakra-ui/react";
import Title from "./Title";
import Tags from "./Tags";
import Description from "./Description";
import AuthorArtists from "./AuthorArtists";

export default function Body() {
    return (
        <CardBody
        >
            <Box marginBottom={"5px"}>
                <Title />
            </Box>
            <Box m={"5px"}>
                <Tags />
            </Box>
            <Description />
            <Box m={"5px"}>
                <AuthorArtists />
            </Box>
        </CardBody>
    );
}