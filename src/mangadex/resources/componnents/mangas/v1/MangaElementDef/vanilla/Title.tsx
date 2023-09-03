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
            textDecoration="none"
            _hover={{
                transitionProperty: "backgroundColor",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease-in-out",
                color: "orange",
                textDecoration: "none"
            }}
            transitionProperty={"backgroundColor"}
            transitionDuration={"0.3s"}
            transitionTimingFunction={"ease-in-out"}
        >
            {title}
        </Heading>
    );
}