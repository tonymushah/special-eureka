import * as Chakra from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import { get_cover_art_image } from "@mangadex/resources/hooks/CoverStateHooks";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";

export default function CoverElementVertical2(props: {
    src: Cover,
    isThumbail?: boolean
}) {
    const { cover_image_query } = get_cover_art_image({
        src: props.src,
        isThumbail: props.isThumbail
    });
    if (cover_image_query.isSuccess) {
        return (
            <Chakra.Image
                src={cover_image_query.data}
                fallbackSrc={Mangadex_placeHolder}
                borderTopLeftRadius={"10px"}
                borderBottomLeftRadius={"10px"}
            />
        );
    }
    if (cover_image_query.isError) {
        return (<Chakra.Image
            src={Mangadex_cover_not_found}
            fallbackSrc={Mangadex_placeHolder}
            borderTopLeftRadius={"10px"}
            borderBottomLeftRadius={"10px"}
        />);
    }
    return (
        <Chakra.Skeleton
            borderTopLeftRadius={"10px"}
            borderBottomLeftRadius={"10px"}
            height={"full"}
        />
    );
}
