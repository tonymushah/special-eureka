import { useProps } from "../../MangaElementDef/vanilla/Props";
import { ResponsiveValue } from "@chakra-ui/react";
import CoverImageByCoverID from "@mangadex/resources/componnents/covers/v1/CoverImageByCoverID";

export default function Cover() {
    const props_ = useProps();
    const card_maxHeight: ResponsiveValue<string> = {
        base: "11em"
    };
    return (
        <CoverImageByCoverID coverID={props_.src.get_cover_art_id()} isThumbail size={512} image_props={{
            maxHeight: card_maxHeight,
            "objectFit": "contain"
        }} />
    );
}