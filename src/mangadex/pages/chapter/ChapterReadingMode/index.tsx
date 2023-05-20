import * as Chakra from "@chakra-ui/react";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import useChapterReadingModeOption from "./useChapterReadingModeOption";

export default function Chapter_Reading_mode() {
    const { query, setReadingMode } = useChapterReadingModeOption();
    if (query.isSuccess) {
        return (
            <Chakra.Menu>
                <Chakra.MenuButton width={"100%"} padding={1} borderRadius={"base"} textAlign="left" _hover={{
                    backgroundColor: "gray.100"
                }}>
                    {query.data}
                </Chakra.MenuButton>
                <Chakra.MenuList zIndex={"banner"}>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.LongStrip);
                    }}>Longstrip</Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.SinglePage);
                    }}>SinglePage</Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.DoublePage);
                    }}>DoublePage</Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.WideStrip);
                    }}>Widestrip</Chakra.MenuItem>
                </Chakra.MenuList>
            </Chakra.Menu>
        );
    }
    return (
        <Chakra.Skeleton />
    );
}