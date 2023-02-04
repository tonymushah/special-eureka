import React from "react";
import { useNavigate } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { getMangaDexPath } from "../..";

const MangaDexPath = getMangaDexPath();

export default function Chapter_Reading_mode(props: {
    chapterID: string
}) {
    const [type, setType] = React.useState("Lonstrip");
    const navigate = useNavigate();
    return (
        <Chakra.Menu>
            <Chakra.MenuButton>
                {type}
            </Chakra.MenuButton>
            <Chakra.MenuList>
                <Chakra.MenuItem onClick={() => {
                    setType("Longstrip");
                    navigate(MangaDexPath + "/chapter/" + props.chapterID);
                }}>Longstrip</Chakra.MenuItem>
                <Chakra.MenuItem onClick={() => {
                    setType("Swipper");
                    navigate("swipper");
                }}>Swipper</Chakra.MenuItem>
                <Chakra.MenuItem onClick={() => {
                    setType("Widestrip");
                    navigate("widestrip");
                }}>Widestrip</Chakra.MenuItem>
            </Chakra.MenuList>
        </Chakra.Menu>
    )
}