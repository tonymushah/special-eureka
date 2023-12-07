import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { Link } from "react-router-dom";
import Title from "./Title";
import { MangaDexPath } from ".";
import { useProps } from "./Props";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OnCatch(__error: Error) {
    return (
        <Chakra.Link
        >
            <Title />
        </Chakra.Link>
    );
}

export default function TryCatchTitle() {
    const { src } = useProps();
    const color = Chakra.useColorModeValue("black", "white");
    return (
        <TryCatch
            catch={OnCatch}
        >
            <Chakra.Link
                as={Link}
                to={MangaDexPath + "/manga/" + src.get_id()}
                color={color}
                textDecoration="none"
                _hover={{
                    color: "orange",
                    textDecoration: "none"
                }}
                fontFamily={"inherit"}
            >
                <Title />
            </Chakra.Link>
        </TryCatch>
    );
}
