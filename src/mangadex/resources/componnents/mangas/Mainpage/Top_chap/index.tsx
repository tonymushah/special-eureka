import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import { Chapters } from "./Chapters";
import { Description } from "./Description";
import Manga_Info from "./Manga_Info";

export function Top_Chaps() {
    return (
        <Chakra.Box>
            <Chakra.Box>
                <Description />
            </Chakra.Box>
            <Chakra.Grid templateColumns={"repeat(12, 1fr)"} className="mg-top-content">
                <Chakra.GridItem
                    colSpan={{
                        base: 12,
                        md: 4,
                        lg: 4
                    }}
                >
                    <Manga_Info />
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 12,
                        sm: 12,
                        md: 8,
                        lg: 8
                    }}
                    display={{
                        sm: "block"
                    }}
                >
                    <Chapters/>
                </Chakra.GridItem>
            </Chakra.Grid>
        </Chakra.Box>
    );
}
