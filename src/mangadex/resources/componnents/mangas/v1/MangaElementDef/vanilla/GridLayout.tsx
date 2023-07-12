import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { Grid } from "@chakra-ui/react";

export default function GridLayout({ children }: React.PropsWithChildren) {
    const { collapsed, broken } = useProSidebar();
    return (
        <Grid
            width={{
                base: collapsed && !broken ? "22em" : "19em"
            }}
            templateRows='repeat(3)'
            templateColumns='repeat(12, 1fr)'
            columnGap={3}
            rowGap={1}
            paddingRight={"10px"}
        >
            {
                children
            }
        </Grid>
    );
}