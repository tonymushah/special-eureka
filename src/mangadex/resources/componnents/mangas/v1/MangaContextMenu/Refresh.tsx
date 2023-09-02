import { HStack, Icon, Box, Text } from "@chakra-ui/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useMangaContextMenu_Context } from ".";
import { useMenuItemsColorModeValue } from "./Portal";

export default function Refresh() {
    const [isRefreshing, startRefresh] = React.useTransition();
    const { refetch, query } = useMangaContextMenu_Context();
    const { backgroundColor } = useMenuItemsColorModeValue();
    if (refetch != undefined) {
        return (
            <Box paddingRight={"2"} paddingLeft={"2"}
                _hover={{
                    backgroundColor
                }}
                as={ContextMenuItem}
                onClick={() => {
                    if (isRefreshing == false) {
                        startRefresh(() => {
                            refetch();
                        });
                    }
                }}
                paddingTop={1}
                paddingBottom={1}
                pl={2}
                pr={2}
            >
                <HStack
                    spacing={"2"}
                >
                    <Icon as={FiRefreshCcw} />
                    <Text as="span">
                        Refresh
                    </Text>
                </HStack>
            </Box>
        );
    } else {
        return (
            <Box paddingRight={"2"} paddingLeft={"2"}
                _hover={{
                    backgroundColor: "gray.100"
                }}
                as={ContextMenuItem}
                onClick={() => {
                    if (!query.isFetching) {
                        query.refetch();
                    }
                }}
                paddingTop={1}
                paddingBottom={1}
                pl={2}
                pr={2}
            >
                <HStack
                    spacing={"2"}
                >
                    <Icon as={FiRefreshCcw} />
                    <Text as="span">
                        Refresh
                    </Text>
                </HStack>
            </Box>
        );
    }
}