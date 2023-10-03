import * as Chakra from "@chakra-ui/react";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import useChapterReadingModeOption from "./useChapterReadingModeOption";
import { ImPageBreak } from "react-icons/im";
import { FiBookOpen } from "react-icons/fi";
import { BsFileEarmark } from "react-icons/bs";
import React from "react";

function LongStripHStack(){
    return (
        <Chakra.HStack>
            <ImPageBreak/>
            <Chakra.Text as="span">LongStrip</Chakra.Text>
        </Chakra.HStack>
    );
}

function DoublePageHStack(){
    return (
        <Chakra.HStack>
            <FiBookOpen/>
            <Chakra.Text as="span">Double Page</Chakra.Text>
        </Chakra.HStack>
    );
}

function SinglePageHStack(){
    return (
        <Chakra.HStack>
            <BsFileEarmark/>
            <Chakra.Text as="span">Single Page</Chakra.Text>
        </Chakra.HStack>
    );
}

function WideStripHStack(){
    return (
        <Chakra.HStack>
            <Chakra.Icon as={ImPageBreak} transform={"rotate(90deg)"}/>
            <Chakra.Text as="span">WideStrip</Chakra.Text>
        </Chakra.HStack>
    );
}

function MenuButtonHStack({ value } : {
    value : ReadingMode
}){
    switch (value) {
        case ReadingMode.LongStrip:
            return (
                <LongStripHStack/>
            );
            break;
        case ReadingMode.DoublePage:
            return (
                <DoublePageHStack/>
            );
            break;
        case ReadingMode.SinglePage:
            return (
                <SinglePageHStack/>
            );
            break;
        case ReadingMode.WideStrip:
            return (
                <WideStripHStack/>
            );
            break;
        
        default:
            return (
                <React.Fragment/>
            );
            break;
    }
}

export default function Chapter_Reading_mode() {
    const { query, setReadingMode } = useChapterReadingModeOption();
    const backgroundColor = Chakra.useColorModeValue("gray.100", "gray.600");
    if (query.isSuccess) {
        return (
            <Chakra.Menu>
                <Chakra.MenuButton width={"10em"} padding={1} borderRadius={"base"} textAlign="left" _hover={{
                    backgroundColor
                }}>
                    <MenuButtonHStack value={query.data}/>
                </Chakra.MenuButton>
                <Chakra.MenuList zIndex={"banner"}>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.LongStrip);
                    }}>
                        <LongStripHStack/>
                    </Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.SinglePage);
                    }}>
                        <SinglePageHStack/>
                    </Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.DoublePage);
                    }}>
                        <DoublePageHStack/>
                    </Chakra.MenuItem>
                    <Chakra.MenuItem onClick={() => {
                        setReadingMode(ReadingMode.WideStrip);
                    }}>
                        <WideStripHStack/>
                    </Chakra.MenuItem>
                </Chakra.MenuList>
            </Chakra.Menu>
        );
    }
    return (
        <Chakra.Skeleton />
    );
}