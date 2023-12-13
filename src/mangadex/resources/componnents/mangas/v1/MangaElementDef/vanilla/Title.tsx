import { Heading } from "@chakra-ui/react";
import {
    //useProps, 
    useProps_MangaTitle
} from "./Props";
import { motion } from "framer-motion";

export default function Title() {
    //const { src } = useProps();
    const title = useProps_MangaTitle();
    return (
        <motion.div
        // layoutId={`manga-title-${src.get_id()}`}
        >
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
        </motion.div>

    );
}