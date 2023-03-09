import React from "react";
import { useNavigate } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";
import { getMangaDexPath } from "../../..";
import useChapterReadingModeOption, { ReadingMode } from "./useChapterReadingModeOption";
import { ChevronDownIcon } from "@chakra-ui/icons";

const MangaDexPath = getMangaDexPath();

export default function Chapter_Reading_mode(props: {
    chapterID: string
}) {
    const { query, setReadingMode } = useChapterReadingModeOption();
    const navigate = useNavigate();
    if (query.isSuccess) {
        return (
            <Chakra.Menu>
                <Chakra.MenuButton width={"100%"} padding={1} borderRadius={"base"} textAlign="left" _hover={{
                    backgroundColor: "gray.100"
                }}>
                    {query.data}
                </Chakra.MenuButton>
                <Chakra.MenuList zIndex={"banner"}>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.Longstrip);
                        navigate(MangaDexPath + "/chapter/" + props.chapterID);
                    }}>Longstrip</Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.Swipper);
                        navigate(`${ReadingMode.Swipper}`.toLowerCase());
                    }}>Swipper</Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.WideStrip);
                        navigate(`${ReadingMode.WideStrip}`.toLowerCase());
                    }}>Widestrip</Chakra.MenuItem>
                </Chakra.MenuList>
            </Chakra.Menu>
        )
    }
    return (
        <Chakra.Skeleton />
    )
}