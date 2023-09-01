import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { useMangaDexPath } from "@mangadex/index";
import { Link } from "react-router-dom";
import { useProps } from "../../MangaElementDef/vanilla";
import MangaTitle from "../../MangaTitle";

export default function Title() {
    const { src } = useProps();
    const color = Chakra.useColorModeValue("black", "white");
    const MangaDexPath = useMangaDexPath();
    return (
        <Chakra.Box>
            <Chakra.Heading
                //textAlign={"center"}
                size={"sm"}
                noOfLines={2}
                margin={"10px"}
                fontFamily={"inherit"}
            >
                <TryCatch catch={() => (
                    <Chakra.LinkOverlay>
                        <MangaTitle
                            src={src}
                        />
                    </Chakra.LinkOverlay>
                )}>
                    <Chakra.LinkOverlay
                        as={Link}
                        to={MangaDexPath + "/manga/" + src.get_id()}
                        color={color}
                        textDecoration={"none"}
                        _hover={{
                            color: "orange",
                            textDecoration: "none"
                        }}
                        transition={"color 0.2s"}
                    >
                        <MangaTitle
                            src={src}
                        />
                    </Chakra.LinkOverlay>
                </TryCatch>
            </Chakra.Heading>
        </Chakra.Box>
    );
}