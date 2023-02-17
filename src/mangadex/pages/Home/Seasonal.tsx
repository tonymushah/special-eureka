import React from "react";
import * as Chakra from "@chakra-ui/react";

const CustomListSwiper = React.lazy(() => import('../../resources/componnents/lists/v1/CustomListSwiper'));

export default function Seasonal() {
    const id_toUse = "44224004-1fad-425e-b416-45b46b74d3d1";
    return (
        <Chakra.Box>
            <Chakra.Heading>Seasonal</Chakra.Heading>
            <React.Suspense
                fallback={<Chakra.Box >
                    <Chakra.Center>
                        <Chakra.Spinner
                            size={"xl"}
                        />
                    </Chakra.Center>
                </Chakra.Box>}
            >
                <CustomListSwiper listID={id_toUse} />
            </React.Suspense>
        </Chakra.Box>
    )
}