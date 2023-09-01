import { useProps } from "../../MangaElementDef/vanilla";

import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { useMangaDexPath } from "@mangadex/index";
import { Link } from "react-router-dom";
import MangaTitle from "../../MangaTitle";

export default function Title() {
    const { src } = useProps();
    const MangaDexPath = useMangaDexPath();
    const color = Chakra.useColorModeValue("black", "white");
    return (
        <TryCatch
            catch={() => (
                <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}>
                    <MangaTitle src={src} />
                </Chakra.Heading>
            )}
        >
            <Chakra.Link
                as={Link}
                to={MangaDexPath + "/manga/" + src.get_id()}
                color={color}
                textDecoration={"none"}
                _hover={{
                    color: "orange",
                    textDecoration: "none"
                }}
            >
                <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}>
                    <MangaTitle src={src} />
                </Chakra.Heading>
            </Chakra.Link>
        </TryCatch>
    );
}