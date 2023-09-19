import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex/index";
import { Link } from "react-router-dom";
import { useProps } from "../../MangaElementDef/vanilla";
import Title_ from "../../MangaElementDef/vanilla/Title";

const MangaDexPath = getMangaDexPath();

function OnTitleCatch() {
    return (
        <Chakra.Link
        //as={Link}
        //to={MangaDexPath + "/manga/" + props.src.get_id()}
        >
            <Title />
        </Chakra.Link>
    );
}
export default function Title() {
    const { src } = useProps();
    const color = Chakra.useColorModeValue("black", "white");
    return (
        <TryCatch
            catch={OnTitleCatch}
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
                <Title_ />
            </Chakra.Link>
        </TryCatch>
    );
}