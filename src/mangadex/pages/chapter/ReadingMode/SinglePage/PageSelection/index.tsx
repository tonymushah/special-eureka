import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";

export default function ChapterReadingOption({ chapter }: {
    chapter: Chapter
}) {
    const chapter_pages = useChapterPages({
        chapter
    });
    const [isTranstion, startTransition] = React.useTransition();
    const page = React.useMemo(() => {
        return chapter_pages.query.data.current;
    }, [chapter_pages.query.data.current]);
    const setPage = chapter_pages.setCurrentPage;
    const rtl_mode = useRTLSwipperMode({
        initialData: false
    });
    const onNext = React.useCallback(() => {
        startTransition(() => {
            if (page >= 0 && page < (chapter.get_pages() - 1)) {
                setPage(page + 1);
            }
        });
    }, [page]);
    const onPrevious = React.useCallback(() => {
        startTransition(() => {
            if (page > 0 && page < chapter.get_pages()) {
                setPage(page - 1);
            }
        });
    }, [page]);
    return (
        <HStack spacing={2}>
            <ButtonGroup isAttached>
                <IconButton 
                    isLoading={isTranstion} 
                    aria-label="Previous" 
                    icon={<Icon as={ChevronLeftIcon} />} 
                    isDisabled={chapter_pages.query.data.current <= 0} 
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
                    <MenuList height={"sm"} overflow={"scroll"}>
                        {
                            (new Array(chapter.get_pages())).map((_, index) => (
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
                    isDisabled={chapter_pages.query.data.current >= chapter_pages.query.data.limit} 
                    aria-label="Next" 
                    icon={<Icon as={ChevronRightIcon} />} 
                    onClick={rtl_mode.query.data == false ? onNext : onPrevious} 
                />
            </ButtonGroup>
        </HStack>
    );
}