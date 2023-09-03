import * as Chakra from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useBackgroundColor, useBackgroundColorHover } from "../ActualSidebar";

export function Follows() {
    const hoverBackgroundColor = useBackgroundColorHover();
    const backgroundColor = useBackgroundColor();
    return (
        <SubMenu
            icon={<FiBookmark fontSize={"20px"} />}
            label="Follows"
            rootStyles={{
                backgroundColor: "inherit"
            }}
        >
            <Menu
                menuItemStyles={{
                    button: {
                        backgroundColor: backgroundColor,
                        ":hover": {
                            backgroundColor: hoverBackgroundColor
                        }
                    }
                }}
            >
                <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                    <MenuItem>
                        <s>Updates</s>
                    </MenuItem>
                </Chakra.Tooltip>
                <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                    <MenuItem>
                        <s>Online Library</s>
                    </MenuItem>
                </Chakra.Tooltip>
                <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                    <MenuItem>
                        <s>MDLists</s>
                    </MenuItem>
                </Chakra.Tooltip>
                <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                    <MenuItem>
                        <s>Followed Groups</s>
                    </MenuItem>
                </Chakra.Tooltip>
            </Menu>
        </SubMenu>
    );
}
