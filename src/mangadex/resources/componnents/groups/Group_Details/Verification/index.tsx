import * as Chakra from "@chakra-ui/react";
import { Inactive } from "./Inactive";
import { Official } from "./Official";
import { Verified } from "./Verified";


export function Verification() {
    return (
        <Chakra.Box>
            <Official />
            <Verified />
            <Inactive />
        </Chakra.Box>
    );
}
