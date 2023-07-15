import * as Chakra from "@chakra-ui/react";
import "@mangadex/resources/css/sidebar.css";
import { FaUser } from "react-icons/fa";
import { Menu, MenuItem } from "react-pro-sidebar";
import  SBOP_ from "./useroption";

export default function SideBarUserOption() {
    return (
        <Menu
            rootStyles={{
                marginBottom: "20px",
                marginTop: "20px"
            }}
            menuItemStyles={{
                button: {
                    ":hover": {
                        backgroundColor: "#525252"
                    }
                }
            }}
        >
            <SBOP_>
                <MenuItem
                    icon={
                        <FaUser />
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