import React from "react";
import { Grid } from "@chakra-ui/react";

export default function GridLayout({ children }: React.PropsWithChildren) {
    return (
        <Grid
            width={"19em"}
            templateRows='repeat(3)'
            templateColumns='repeat(12, 1fr)'
            columnGap={3}
            rowGap={1}
            paddingRight={"10px"}
            height={"130px"}
        >
            {
                children
            }
        </Grid>
    );
}