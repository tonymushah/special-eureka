import { Heading } from "@chakra-ui/react";
import { useProps_MangaTitle } from ".";

export default function Title() {
    const title = useProps_MangaTitle();
    return (
        <Heading
            noOfLines={2}
            marginTop={"5px"}
            fontSize={"md"}
            marginBottom={0}
            fontFamily={"inherit"}
            color={"black"}
            textDecoration="none"
            _hover={{
                color: "orange",
                textDecoration: "none"
            }}
        > 
            {title} 
        </Heading>
    );
}