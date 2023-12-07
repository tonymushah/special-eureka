import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { Link } from "react-router-dom";
import { useProps } from "../../MangaElementDef/vanilla/Props";
import { getMangaDexPath } from "@mangadex/index";

const MangaDexPath = getMangaDexPath();

function OnError() {
    const { src } = useProps();
    return (
        <Chakra.Heading fontFamily={"inherit"} noOfLines={2}>
            <MangaTitle src={src} />
        </Chakra.Heading>
    );
}

export default function Title() {
    const { src } = useProps();
    const color = Chakra.useColorModeValue("black", "white");
    return (
        <TryCatch
            catch={OnError}
        >
            <Chakra.Heading
                fontFamily={"inherit"}
                noOfLines={2}
                as={Link}
                to={MangaDexPath + "/manga/" + src.get_id()}
                textDecoration={"none"}
                color={color}
                _hover={{
                    color: "orange",
                    textDecoration: "none"
                }}
            >
                <MangaTitle src={src} />
            </Chakra.Heading>
        </TryCatch>
    );
}