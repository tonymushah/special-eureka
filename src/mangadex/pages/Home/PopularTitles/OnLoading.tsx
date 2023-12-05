import * as Chakra from "@chakra-ui/react";
import Title from "./Title";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";

export function OnLoading() {
    return (
        <Chakra.Box width={"100%"}>
            <Title />
            <MangaFallback2 />
        </Chakra.Box>
    );
}
