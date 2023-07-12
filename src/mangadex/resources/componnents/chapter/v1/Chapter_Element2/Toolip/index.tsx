import * as Chakra from "@chakra-ui/react";
import React from "react";
import Groups from "./Groups";
import User from "./User";

export default function Tooltip({ children }: React.PropsWithChildren) {
    return (
        <Chakra.Tooltip
            label={
                <Chakra.Box>
                    <Chakra.Text margin={0} padding={0}>
                        Uploaded by :
                    </Chakra.Text>
                    <Groups />
                    <User />
                </Chakra.Box>
            }
        >
            {children}
        </Chakra.Tooltip>
    );
}