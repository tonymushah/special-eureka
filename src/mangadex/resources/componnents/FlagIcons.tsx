import "@commons-res/flag-icons/less/flag-icons.less";
import { Box } from "@chakra-ui/react";

type Flag_icons_props = {
    locale : string;
}

export default function Flag_icons(props: Flag_icons_props){
    return (
        <Box as={"span"} className={"fi fi-" + props.locale.toLowerCase()}></Box>
    );
}