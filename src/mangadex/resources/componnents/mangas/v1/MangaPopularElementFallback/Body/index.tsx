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
            <Box mb={"5px"}>
                <Tags />
            </Box>
            <Description />
            <Box mt={"5px"} mb={"5px"}>
                <AuthorArtists />
            </Box>
        </CardBody>
    );
}