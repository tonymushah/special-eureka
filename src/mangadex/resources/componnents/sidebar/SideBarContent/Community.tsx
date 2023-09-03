import * as ChakraIcons from "@chakra-ui/icons";
import { ExtLink } from "@commons-res/components/ExtLink";
import { Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { useBackgroundColor, useBackgroundColorHover, useBorderColor } from "../ActualSidebar";
import { FiUsers } from "react-icons/fi";
import { FaComments } from "react-icons/fa";


export function Community() {
    const { collapseSidebar } = useProSidebar();
    const hoverBackgroundColor = useBackgroundColorHover();
    const backgroundColor = useBackgroundColor();
    const boxShadow = useBorderColor();
    return (
        <SubMenu defaultOpen={false} icon={<FiUsers fontSize={"20px"} onClick={() => collapseSidebar()} />} label={"Community"} >
            <Menu
                menuItemStyles={{
                    button: {
                        backgroundColor,
                        ":hover": {
                            backgroundColor: hoverBackgroundColor
                        }
                    }
                }}
                rootStyles={{
                    boxShadow: `0px 0px 10px ${boxShadow}`
                }}
            >
                <ExtLink href="https://forums.mangadex.org/">
                    <MenuItem
                        icon={<FaComments />}
                        suffix={<ChakraIcons.ExternalLinkIcon />}
                    >
                        Forums
                    </MenuItem>
                </ExtLink>
            </Menu>
        </SubMenu>
    );
}
