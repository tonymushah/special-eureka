import React from "react";
import { useProps } from "../../v1/MangaElementDef/vanilla/Props";
import { HStack } from "@chakra-ui/react";
import { Get_status_color } from "../../v1/MangaStatus";

export default function Publication() {
    const { src } = useProps();
    const year = React.useMemo(() => {
        const year_ = src.get_year();
        if (year_ == null) {
            return "";
        } else {
            return year_;
        }
    }, [src]);
    return (
        <HStack>
            <React.Fragment>
                Publication :
            </React.Fragment>
            <React.Fragment>
                {
                    year
                }
            </React.Fragment>
            <Get_status_color src={src} />
        </HStack>
    );
}