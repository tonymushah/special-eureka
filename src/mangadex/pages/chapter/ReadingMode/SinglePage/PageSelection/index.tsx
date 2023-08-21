import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import usePageSelectionState from "./usePageSelectionState";
import React from "react";

export default function ChapterReadingOption({ chapter }: {
    chapter: Chapter
}) {
    const { isTranstion, rtl_mode, isPreviousDisabled, isNextDisabled, onPrevious, onNext, page, setPage, } = usePageSelectionState(chapter);
    const indexs = React.useMemo(() => {
        const c = [];
        for(let i = 0; i < chapter.get_pages(); i++) c.push(i);
        return c;
    }, [chapter]);
    return (
        <HStack spacing={2}>
            <ButtonGroup isAttached>
                <IconButton 
                    isLoading={isTranstion} 
                    aria-label="Previous" 
                    icon={<Icon as={ChevronLeftIcon} />} 
                    isDisabled={rtl_mode.query.data == false ? isPreviousDisabled : isNextDisabled} 
                    onClick={rtl_mode.query.data == false ? onPrevious : onNext} 
                />
                <Menu>
                    <MenuButton 
                        isLoading={isTranstion} 
                        as={Button} 
                        rightIcon={<Icon as={ChevronDownIcon} />}
                    >
                        {
                            page + 1
                        }
                    </MenuButton>
                    <MenuList height={"xs"} overflow={"scroll"}>
                        {
                            indexs.map((_, index) => (
                                <MenuItem
                                    key={`${chapter.get_id()}~~__~~${index}`}
                                    onClick={() => {
                                        setPage(index);
                                    }}
                                >
                                    {index + 1}
                                </MenuItem>
                            ))
                        }
                    </MenuList>
                </Menu>
                <IconButton 
                    isLoading={isTranstion} 
                    isDisabled={rtl_mode.query.data == false ? isNextDisabled : isPreviousDisabled} 
                    aria-label="Next" 
                    icon={<Icon as={ChevronRightIcon} />} 
                    onClick={rtl_mode.query.data == false ? onNext : onPrevious} 
                />
            </ButtonGroup>
        </HStack>
    );
}


