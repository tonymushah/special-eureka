import * as Chakra from "@chakra-ui/react";
import React from "react";

const FallBackImage = React.memo(function FallBackImage({ card_maxHeight }: {
    card_maxHeight: Chakra.ResponsiveValue<string>;
}) {
    return (
        <Chakra.Skeleton
            width={"6em"}
            maxHeight={card_maxHeight} />
    );
});

export default FallBackImage;
