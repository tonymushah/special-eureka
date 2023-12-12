import { CardBody } from "@chakra-ui/react";
import Title from "./Title";
import Tags from "./Tags";
import Description from "./Description";
import AuthorArtists from "./AuthorArtists";

export default function Body() {
    return (
        <CardBody>
            <Title />
            <Tags />
            <Description />
            <AuthorArtists />
        </CardBody>
    );
}