import React from "react";
import * as Chakra from "@chakra-ui/react";

const CustomListSwiper = React.lazy(() => import("@mangadex/resources/componnents/lists/v1/CustomListSwiper"));

export function getSeasonalId(){
    return "44224004-1fad-425e-b416-45b46b74d3d1";
}

export default function Seasonal() {
    const id_toUse = getSeasonalId();
    return (
        <Chakra.Box>
            <Chakra.Heading fontFamily={"inherit"}>Seasonal</Chakra.Heading>
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
    );
}