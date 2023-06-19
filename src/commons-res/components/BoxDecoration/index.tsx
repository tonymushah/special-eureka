// TODO Custom window decorations 

import { Box, ButtonGroup } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CloseButton from "./CloseButton";
import MinMaxButton from "./MaxMinButton";

const queryClient = new QueryClient();


export default function BoxDecoration() {
    return (
        <QueryClientProvider client={queryClient}>
            <Box position={"fixed"} display={"flex"} zIndex={"banner"} justifyContent={"flex-end"} top={0} left={0} right={0}>
                <Box data-tauri-drag-region pt={1} pb={1} pr={3} pl={3} background={"gray.50"} borderBottomLeftRadius={"10px"}>
                    <ButtonGroup isAttached variant='outline'>
                        <MinMaxButton />
                        <CloseButton />
                    </ButtonGroup>
                </Box>
            </Box>
        </QueryClientProvider>
    );
}