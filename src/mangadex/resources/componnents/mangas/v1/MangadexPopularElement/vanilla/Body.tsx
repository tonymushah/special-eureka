import { CardBody } from "@chakra-ui/react";
import AuthorArtists from "./AuthorArtists";
import Tags from "./Tags";
import Title from "./Title";

export default function Body() {
    return (
        <CardBody>
            <Title />
            <Tags />
            <AuthorArtists />
        </CardBody>
    );
}