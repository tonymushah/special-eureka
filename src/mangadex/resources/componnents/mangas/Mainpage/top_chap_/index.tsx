import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import { Description } from "@mangadex/resources/componnents/mangas/Mainpage/top_chap_/Description";
import Manga_Info from "@mangadex/resources/componnents/mangas/Mainpage/top_chap_/Manga_Info";
import { Chapters } from "@mangadex/resources/componnents/mangas/Mainpage/top_chap_/Chapters";

export function Top_Chaps() {
    return (
        <Chakra.Box>
            <Chakra.Box>
                <Description />
            </Chakra.Box>
            <Chakra.Grid templateColumns={"repeat(12, 1fr)"} className="mg-top-content">
                <Chakra.GridItem
                    colSpan={{
                        base: 12
                    }}
                >
                    <Manga_Info />
                </Chakra.GridItem>
                <Chakra.GridItem
                    colSpan={{
                        base: 12
                    }}
                    display={{
                        sm: "block"
                    }}
                >
                    <Chapters />
                </Chakra.GridItem>
            </Chakra.Grid>
        </Chakra.Box>
    );
}