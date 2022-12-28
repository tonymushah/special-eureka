import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { Box, Icon, BoxProps } from "@chakra-ui/react";

class Flag_icons_props{
    locale : string;
}

export default function Flag_icons(props: Flag_icons_props){
    return (
        <Box className={"fi fi-" + props.locale.toLowerCase()}></Box>
    )
}