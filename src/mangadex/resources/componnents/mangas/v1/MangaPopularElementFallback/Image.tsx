import * as Chakra from "@chakra-ui/react";

import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";

export default function Image() {
    return (
        <Chakra.Skeleton
            boxShadow={"lg"}
            borderRadius={"10px"}
        >
            <Chakra.Image
                src={CoverPlaceHolder}
                objectFit={"cover"}
                maxW={"200px"}
                margin={"10px"}
                boxShadow={"lg"}
                borderRadius={"10px"}
            />
        </Chakra.Skeleton>
    );
}