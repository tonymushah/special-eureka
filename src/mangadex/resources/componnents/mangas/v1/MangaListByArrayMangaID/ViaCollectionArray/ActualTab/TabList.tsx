import * as Chakra from "@chakra-ui/react";
import * as FontAwesome from "react-icons/fa";

export function TabList() {
    return (
        <Chakra.TabList>
            <Chakra.Tab
            >
                <FontAwesome.FaThList />
            </Chakra.Tab>
            <Chakra.Tab
            >
                <FontAwesome.FaThLarge />
            </Chakra.Tab>
            <Chakra.Tab
            >
                <FontAwesome.FaTh />
            </Chakra.Tab>
        </Chakra.TabList>
    );
}
