import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterPages from "../useChapterPages";

export default function Long_Wide_StripPS(props: {
    chapter: Chapter
}) {
    const { query, setCurrentPage } = useChapterPages(props);
    if (query.isSuccess == true) {
        const changeIndex = (index: number) => {
            document.getElementById(`mdx-chapter-${props.chapter.get_id()}-${index}`)?.scrollIntoView();
            setCurrentPage(index);
        };
        const generate_menu_item = (limit: number) => {
            const array = new Array<React.ReactNode>(limit);
            for (let index = 0; index < limit; index++) {
                array[index] = (
                    <MenuItem
                        onClick={() => {
                            changeIndex(index + 1);
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