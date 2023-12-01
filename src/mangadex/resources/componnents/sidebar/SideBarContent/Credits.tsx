import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import { useBackgroundColor, useBackgroundColorHover } from "../ActualSidebar";
import { FaCog } from "react-icons/fa";

export function Credits() {
    const { collapseSidebar } = useProSidebar();
    const hoverBackgroundColor = useBackgroundColorHover();
    const backgroundColor = useBackgroundColor();
    return (
        <SubMenu defaultOpen={false} icon={<Chakra.Icon
            fontSize={"20px"}
            as={FaCog}
            onClick={() => collapseSidebar()}
            className={"fa-spin"} />} label={"Powerred by "}>
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
                <ExtLink href="https://api.mangadex.org">
                    <MenuItem
                        icon={<img id="tauri_icon" src={mangadex_logo} />}
                        suffix={<ChakraIcons.ExternalLinkIcon />}
                    >
                        Mangadex API
                    </MenuItem>
                </ExtLink>
            </Menu>
        </SubMenu>
    );
}
