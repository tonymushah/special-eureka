import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { useSwipperModeRefData } from "@mangadex/pages/chapter/ReadingMode/SwipperMode/useSwipperModeRef";
import useChapterPages from "../useChapterPages";

export default function SwipperPS(props: {
    chapter: Chapter
}) {
    const { query, setCurrentPage } = useChapterPages(props);
    const swipper = useSwipperModeRefData(props);
    if (query.isSuccess == true && swipper.query.isSuccess == true) {
        const changeIndex = (index: number) => {
            swipper.query.data?.current?.swiper.slideTo(index);
            setCurrentPage(index);
        };
        const generate_menu_item = (limit: number) => {
            const array = new Array<React.ReactNode>(limit);
            for(let index = 0; index < limit; index++){
                array[index] = (
                    <MenuItem
                        onClick={() => {
                            changeIndex(index);
                        }}
                    >{index + 1}</MenuItem>
                );
            }
            return array;
        };
        return (
            <HStack
                spacing={"5px"}
            >
                <IconButton
                    aria-label="Previous page"
                    icon={<ChevronLeftIcon />}
                    onClick={() => {
                        changeIndex(query.data.current - 1);
                    }}
                />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {query.data.current}
                        </MenuButton>
                        <MenuList maxH={"200px"} overflow={"scroll"}>
                            {
                                generate_menu_item(query.data.limit)
                            }
                        </MenuList>
                    </Menu>
                <IconButton
                    aria-label="Next page"
                    icon={<ChevronRightIcon />}
                    onClick={() => {
                        changeIndex(query.data.current + 1);
                    }}
                />
            </HStack>
        );
    }
    return (
        <Text>Loading...</Text>
    );
}