import * as Chakra from "@chakra-ui/react";
import "@mangadex/resources/css/sidebar.css";
import { Menu, MenuItem } from "react-pro-sidebar";
import  SBOP_ from "./useroption";
import { FiUser } from "react-icons/fi";
import { useBackgroundColorHover } from "./ActualSidebar";

export default function SideBarUserOption() {
    const onHover = useBackgroundColorHover();
    return (
        <Menu
            rootStyles={{
                marginBottom: "20px",
                marginTop: "20px"
            }}
            menuItemStyles={{
                button: {
                    ":hover": {
                        backgroundColor: onHover
                    }
                }
            }}
        >
            <SBOP_>
                <MenuItem
                    icon={
                        <FiUser fontSize={"20px"} />
                    }
                    suffix={
                        <Chakra.Tooltip placement="right" hasArrow label={"Available in a future update"}>
                            <Chakra.Button
                                colorScheme={"facebook"}
                            >
                                <s>Login</s>
                            </Chakra.Button>
                        </Chakra.Tooltip>
                    }
                >
                    Guest
                </MenuItem>
            </SBOP_>
        </Menu>
    );
}