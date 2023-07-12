import { Heading } from "@chakra-ui/react";
import { useProSidebar } from "react-pro-sidebar";
import { useProps_MangaTitle } from ".";

export default function Title() {
    const { collapsed, broken } = useProSidebar();
    const title = useProps_MangaTitle();
    return (
        <Heading
            noOfLines={2}
            marginTop={"5px"}
            fontSize={
                {
                    base: collapsed && !broken ? "lg" : "md"
                }
            }
            marginBottom={0}
            fontFamily={"inherit"}
            color={"black"}
            textDecoration="none"
            _hover={{
                color: "orange",
                textDecoration: "none"
            }}
        > {title} </Heading>
    );
}