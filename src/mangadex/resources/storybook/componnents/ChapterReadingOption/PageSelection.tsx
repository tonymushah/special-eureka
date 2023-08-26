import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import React from "react";
import { useStoryBookRTLSwipperMode } from "../../hooks/user-option/RTLMode";

export default function PageSelection({ data }: {
    data: ChapterPage_outlet_context
}) {
    const chapter_pages = useChapterPages({
        chapter: data.chapter
    });
    const page = React.useMemo(() => {
        return chapter_pages.query.data.current;
    }, [chapter_pages.query.data.current]);
    const setPage = chapter_pages.setCurrentPage;
    const rtl_mode = useStoryBookRTLSwipperMode({
        initialData: false
    });
    const onNext = React.useCallback(() => {
        if (page >= 0 && page < (data.images.length - 1)) {
            setPage(page + 1);
        }
    }, [page]);
    const onPrevious = React.useCallback(() => {
        if (page > 0 && page < data.images.length) {
            setPage(page - 1);
        }
    }, [page]);
    return (
        <ButtonGroup isAttached>
            <IconButton aria-label="Previous" icon={<Icon as={ChevronLeftIcon} />} onClick={rtl_mode.query.data == false ? onPrevious : onNext} />
            <Menu>
                <MenuButton as={Button} rightIcon={<Icon as={ChevronDownIcon} />}>
                    {
                        page + 1
                    }
                </MenuButton>
                <MenuList height={"sm"} overflow={"scroll"}>
                    {
                        data.images.map((_e, index) => (
                            <MenuItem
                                key={`${_e}~~__~~${index}`}
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
            <IconButton aria-label="Next" icon={<Icon as={ChevronRightIcon} />} onClick={rtl_mode.query.data == false ? onNext : onPrevious} />
        </ButtonGroup>
    );
}