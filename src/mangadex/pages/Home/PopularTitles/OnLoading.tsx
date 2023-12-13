import * as Chakra from "@chakra-ui/react";
import Title from "./Title";
import MangaPopularElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaPopularElementFallback";

export function OnLoading() {
    return (
        <Chakra.Box width={"100%"}>
            <Title />
            <MangaPopularElementFallback />
        </Chakra.Box>
    );
}
